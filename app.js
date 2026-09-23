(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 700px)');
  const portraitFilm = matchMedia('(max-width: 1050px) and (orientation: portrait)');
  const short = matchMedia('(max-height: 650px) and (min-width: 701px)');
  const designs = {
    square: { name: 'The Square', file: 'assets/square-clock.png', caption: '01 / THE SQUARE' },
    round: { name: 'The Round', file: 'assets/round-clock.png', caption: '02 / THE ROUND' }
  };
  let selected = 'square';
  const dialog = $('#photo-dialog');
  let opener;
  function select(key) {
    selected = key;
    const design = designs[key];
    $('#selected-name').textContent = design.name;
    $('#selected-image').src = design.file;
    $('#selected-image').alt = `${design.name} floral clock product visual`;
    $('#selected-caption').textContent = design.caption;
    $$('[data-shape]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.shape === key)));
    $('#copy-status').textContent = '';
  }
  function openPhoto(key, trigger) {
    const design = designs[key];
    opener = trigger;
    $('#dialog-title').textContent = design.name;
    $('#dialog-image').src = design.file;
    $('#dialog-image').alt = `Enlarged ${design.name} floral clock product visual`;
    dialog.showModal();
  }
  $$('[data-shape]').forEach(button => button.addEventListener('click', () => select(button.dataset.shape)));
  $$('[data-select]').forEach(button => button.addEventListener('click', () => {
    select(button.dataset.select);
    $('#choose').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth' });
    $(`[data-shape="${selected}"]`).focus({ preventScroll: true });
  }));
  $$('[data-photo]').forEach(button => button.addEventListener('click', () => openPhoto(button.dataset.photo, button)));
  $('#selected-enlarge').addEventListener('click', event => openPhoto(selected, event.currentTarget));
  $('#photo-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  $('#copy').addEventListener('click', async () => {
    const name = designs[selected].name;
    const text = `TILE TIME / ${name}\nColourful floral clock · Wood-tone frame · Gold-tone hands\nSize, materials, price and availability: please confirm with the seller.`;
    try {
      await navigator.clipboard.writeText(text);
      $('#copy-status').textContent = `${name} details copied.`;
    } catch {
      $('#copy-status').textContent = `${text}\nSelect this text to copy.`;
    }
  });

  // Desktop follows native scroll; mobile retains normal loop playback.
  const video = $('#opening-video');
  const media = $('.hero-media');
  const toggle = $('#motion-toggle');
  let manualPause = false, inView = true, mediaKey = '', revision = 0;
  let fallbackUsed = false, playPending = false;
  const motionOff = () => reduced.matches || manualPause;
  const desktopFilm = () => !mobile.matches && !portraitFilm.matches;
  const scrollFilm = () => desktopFilm() && !motionOff();
  let targetTime = 0;
  function seekFilm() {
    if (!scrollFilm() || document.hidden || dialog.open || video.readyState < 2 || video.seeking) return;
    if (Math.abs(video.currentTime - targetTime) > 1 / 48) video.currentTime = targetTime;
  }
  video.addEventListener('seeked', seekFilm);
  video.addEventListener('loadeddata', () => {
    if (desktopFilm() && !motionOff()) media.classList.add('is-playing');
    schedule();
  });
  video.muted = true;
  video.defaultMuted = true;
  function syncVideo() {
    if (motionOff() || !inView || document.hidden || dialog.open) { video.pause(); return; }
    if (!video.currentSrc && !video.src) loadMedia();
    if (desktopFilm()) { video.pause(); schedule(); return; }
    if (playPending || !video.paused) return;
    const token = revision;
    playPending = true;
    video.play().then(() => {
      if (token !== revision || motionOff() || !inView || document.hidden || dialog.open) video.pause();
    }).catch(error => {
      if (error.name !== 'AbortError') {
        $('#film-status').textContent = 'Animation is paused by your browser. Use Resume motion in the footer to play.';
        toggle.textContent = 'Resume motion';
      }
    }).finally(() => { playPending = false; });
  }
  function loadMedia() {
    const kind = (mobile.matches || portraitFilm.matches) ? 'mobile' : 'desktop';
    const format = desktopFilm() ? 'mp4' : (video.canPlayType('video/webm; codecs="vp9"') ? 'webm' : 'mp4');
    const key = `${kind}.${format}`;
    if (key === mediaKey) return;
    mediaKey = key;
    revision++;
    fallbackUsed = false;
    media.classList.remove('is-playing');
    video.pause();
    video.autoplay = !desktopFilm();
    video.loop = !desktopFilm();
    video.preload = desktopFilm() ? 'auto' : 'metadata';
    targetTime = 0;
    video.poster = desktopFilm() ? 'assets/scroll-desktop-poster.jpg' : 'assets/normal-mobile-poster.jpg';
    video.src = desktopFilm() ? 'assets/scroll-desktop.mp4' : `assets/normal-${key}`;
    video.load();
  }
  let previousVideoTime = 0, loopCount = 0;
  video.addEventListener('timeupdate', () => { if (video.currentTime + .3 < previousVideoTime) { loopCount++; video.dataset.loops = String(loopCount); } previousVideoTime = video.currentTime; });
  video.addEventListener('playing', () => {
    media.classList.add('is-playing');
    $('#film-status').textContent = '';
  });
  video.addEventListener('canplay', syncVideo);
  video.addEventListener('error', () => {
    if (!fallbackUsed && video.src.endsWith('.webm')) {
      fallbackUsed = true;
      video.src = video.src.replace(/\.webm$/, '.mp4');
      video.load();
    } else {
      media.classList.remove('is-playing');
      $('#film-status').textContent = 'The animation is unavailable. The product image is shown instead.';
    }
  });
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncVideo(); }, { threshold: .04 }).observe($('#top'));
  document.addEventListener('visibilitychange', syncVideo);
  new MutationObserver(syncVideo).observe(dialog, { attributes: true, attributeFilter: ['open'] });

  // Native scroll drives transform/opacity only. Geometry is cached on resize.
  const journey = $('.film-journey');
  const story = $('#details'), stage = $('.story-stage'), product = $('.story-product');
  const beats = $$('.story-beat'), heroCopy = $('.hero-copy'), heading = $('.story-heading');
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const x = clamp(value); return x * x * (3 - 2 * x); };
  let geometry, frame = 0;
  function measure() {
    geometry = { filmTop: journey.getBoundingClientRect().top + scrollY, filmDistance: Math.max(1, journey.offsetHeight - $('#top').offsetHeight), top: story.getBoundingClientRect().top + scrollY, distance: Math.max(1, story.offsetHeight - stage.offsetHeight), heroHeight: $('#top').offsetHeight };
    schedule();
  }
  function resetStory() {
    [product, heading, media, heroCopy, ...beats].forEach(el => { el.style.transform = ''; el.style.opacity = ''; });
    beats.forEach(el => el.removeAttribute('aria-hidden'));
  }
  function render() {
    frame = 0;
    if (motionOff() || !geometry) return;
    if (desktopFilm()) {
      const progress = clamp((scrollY - geometry.filmTop) / geometry.filmDistance);
      if (Number.isFinite(video.duration)) {
        targetTime = progress * Math.max(0, video.duration - 1 / 24);
        seekFilm();
      }
    }
    if (short.matches) return;
    const heroP = desktopFilm() ? clamp((scrollY - geometry.filmTop) / (geometry.filmDistance * .3)) : clamp(scrollY / geometry.heroHeight);
    heroCopy.style.transform = `translate3d(0,${-heroP * (mobile.matches ? 12 : 40)}px,0)`;
    heroCopy.style.opacity = String(1 - smooth(heroP) * (desktopFilm() ? 1 : .9));
    media.style.transform = 'none';
    const p = clamp((scrollY - geometry.top) / geometry.distance);
    // Enlarge, move to the detail, then return to the whole object before release.
    const rise = smooth(p / .55), returnToWhole = smooth((p - .73) / .27);
    const intensity = rise * (1 - returnToWhole);
    const scale = 1 + intensity * (mobile.matches ? .13 : .27);
    const x = intensity * (mobile.matches ? -2 : -5);
    const y = intensity * (mobile.matches ? 1 : 3);
    product.style.transform = mobile.matches
      ? `translate(-50%,-50%) translate3d(${x}%,${y}%,0) scale(${scale})`
      : `translateY(-50%) translate3d(${x}%,${y}%,0) scale(${scale}) rotate(${intensity * -.7}deg)`;
    const weights = [1 - smooth((p - .20) / .07), smooth((p - .28) / .07) * (1 - smooth((p - .55) / .07)), smooth((p - .63) / .07)];
    beats.forEach((el, index) => {
      el.style.opacity = String(weights[index]);
      el.style.transform = `translate3d(0,${(1 - weights[index]) * 12}px,0)`;
      el.setAttribute('aria-hidden', String(weights[index] < .5));
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  function applyMotion() {
    const enabled = !motionOff() && !short.matches;
    document.body.classList.toggle('motion', enabled);
    document.body.classList.toggle('scroll-film', scrollFilm());
    toggle.textContent = reduced.matches ? 'Reduced motion enabled' : (motionOff() ? 'Resume motion' : 'Pause motion');
    toggle.setAttribute('aria-pressed', String(motionOff()));
    if (!enabled) resetStory();
    if (!motionOff()) loadMedia();
    syncVideo();
    measure();
  }
  toggle.addEventListener('click', () => {
    // A system reduced-motion setting is never overridden by page controls.
    if (reduced.matches) {
      $('#film-status').textContent = 'Reduced motion is enabled in your device settings.';
      toggle.textContent = 'Reduced motion enabled';
      return;
    }
    if (!manualPause && toggle.textContent === 'Resume motion') { syncVideo(); toggle.textContent = 'Pause motion'; return; }
    manualPause = !manualPause;
    applyMotion();
  });
  reduced.addEventListener('change', applyMotion);
  mobile.addEventListener('change', () => { if (!motionOff()) loadMedia(); applyMotion(); });
  short.addEventListener('change', applyMotion);
  portraitFilm.addEventListener('change', applyMotion);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  new ResizeObserver(measure).observe(story);
  const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); }
  }), { threshold: .08 });
  $$('[data-reveal]').forEach(el => reveals.observe(el));
  applyMotion();
  // Diagnostic observations have no layout effect and make QA reproducible.
  const metrics = { cls: 0, longTasks: 0, maxLongTaskMs: 0 }; document.body.dataset.cls = '0'; document.body.dataset.longTasks = '0';
  if ('PerformanceObserver' in window) {
    try { new PerformanceObserver(list => list.getEntries().forEach(e => { if (!e.hadRecentInput) { metrics.cls += e.value; document.body.dataset.cls = metrics.cls.toFixed(5); } })).observe({ type: 'layout-shift', buffered: true }); } catch {}
    try { new PerformanceObserver(list => list.getEntries().forEach(e => { metrics.longTasks++; metrics.maxLongTaskMs = Math.max(metrics.maxLongTaskMs, e.duration); document.body.dataset.longTasks = String(metrics.longTasks); document.body.dataset.maxLongTaskMs = String(metrics.maxLongTaskMs); })).observe({ type: 'longtask', buffered: true }); } catch {}
  }
  Object.defineProperty(window, 'tileTimeMetrics', { get: () => ({ ...metrics }) });
})();
