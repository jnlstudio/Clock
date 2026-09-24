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

  // A single product film follows native scroll on every viewport.
  const video = $('#opening-video');
  const media = $('.hero-media');
  const toggle = $('#motion-toggle');
  let manualPause = false, inView = true, mediaKey = '', revision = 0;
  let fallbackUsed = false, playPending = false;
  const motionOff = () => reduced.matches || manualPause;
  const desktopFilm = () => !mobile.matches && !portraitFilm.matches;
  const scrollFilm = () => !motionOff();
  let targetTime = 0;
  function seekFilm() {
    if (!scrollFilm() || document.hidden || dialog.open || video.readyState < 2 || video.seeking) return;
    if (Math.abs(video.currentTime - targetTime) > 1 / 48) video.currentTime = targetTime;
  }
  video.addEventListener('seeked', seekFilm);
  video.addEventListener('loadeddata', () => {
    if (!motionOff()) media.classList.add('is-playing');
    schedule();
  });
  video.muted = true;
  video.defaultMuted = true;
  function syncVideo() {
    if (motionOff() || !inView || document.hidden || dialog.open) { video.pause(); return; }
    if (!video.currentSrc && !video.src) loadMedia();
    if (scrollFilm()) { video.pause(); schedule(); return; }
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
    if (mediaKey === 'editorial') return;
    mediaKey = 'editorial';
    revision++;
    fallbackUsed = false;
    media.classList.remove('is-playing');
    video.pause();
    video.autoplay = false;
    video.loop = false;
    video.preload = 'auto';
    targetTime = 0;
    video.poster = 'assets/scroll-desktop-poster.jpg';
    video.src = 'assets/scroll-desktop.mp4';
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

  // One sticky film and one rAF timeline for both editorial acts.
  const journey = $('.film-journey'), scene = $('#scene-two');
  const beats = $$('.story-beat'), heroCopy = $('.hero-copy');
  const eyebrow = $('.story-heading .eyebrow'), heading = $('#details-title');
  const cta = $('.story-photo'), heroBottom = $('.hero-bottom');
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const x = clamp(value); return x * x * (3 - 2 * x); };
  let geometry, frame = 0;
  function measure() {
    geometry = { top: journey.getBoundingClientRect().top + scrollY, distance: Math.max(1, journey.offsetHeight - $('#top').offsetHeight) };
    schedule();
  }
  function reveal(el, value, distance = 30) {
    el.style.opacity = String(value);
    el.style.transform = `translate3d(0,${(1-value)*distance}px,0)`;
  }
  function render() {
    frame = 0;
    if (motionOff() || !geometry) return;
    const p = clamp((scrollY - geometry.top) / geometry.distance);
    journey.dataset.progress = p.toFixed(4);
    document.body.classList.toggle('film-active',scrollY < geometry.top + geometry.distance);
    if (Number.isFinite(video.duration)) {
      targetTime = p * Math.max(0, video.duration - 1 / 24);
      seekFilm();
    }
    const transition = smooth((p - .18) / .20);
    const first = 1 - smooth((p - .18) / .14);
    reveal(heroCopy, first, -30);
    heroCopy.inert = first < .02;
    heroCopy.setAttribute('aria-hidden', String(first < .02));
    reveal(heroBottom, first, 0);
    heroBottom.inert = first < .02;
    scene.inert = transition < .02;
    scene.setAttribute('aria-hidden', String(transition < .02));
    $('#top').style.setProperty('--act', transition.toFixed(4));
    reveal(eyebrow, smooth((p - .22) / .10), 16);
    reveal(heading, smooth((p - .25) / .13), 40);
    const intro = smooth((p - .36) / .10);
    const weights = [1-smooth((p-.59)/.05),smooth((p-.65)/.05)*(1-smooth((p-.78)/.05)),smooth((p-.84)/.05)];
    beats.forEach((el,i) => {
      reveal(el, intro * weights[i], 18);
      el.setAttribute('aria-hidden', String(intro * weights[i] < .5));
    });
    reveal(cta, smooth((p - .43) / .08), 12);
    cta.inert = p < .44;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  function applyMotion() {
    const enabled = !motionOff();
    document.body.classList.toggle('motion', enabled);
    document.body.classList.toggle('scroll-film', enabled);
    document.body.classList.toggle('editorial-motion', enabled);
    toggle.textContent = reduced.matches ? 'Reduced motion enabled' : (enabled ? 'Pause motion' : 'Resume motion');
    toggle.setAttribute('aria-pressed', String(!enabled));
    if (!enabled) {
      document.body.classList.remove('film-active');
      [heroCopy,heroBottom,eyebrow,heading,cta,...beats].forEach(el => { el.style.opacity='';el.style.transform='';el.inert=false;el.removeAttribute('aria-hidden'); });
      scene.inert=false;scene.removeAttribute('aria-hidden');
      $('#top').style.setProperty('--act','0');
    }
    if (enabled) loadMedia();
    syncVideo();
    measure();
  }
  toggle.addEventListener('click', () => {
    if (reduced.matches) return;
    manualPause = !manualPause;
    applyMotion();
  });
  reduced.addEventListener('change', applyMotion);
  mobile.addEventListener('change', applyMotion);
  portraitFilm.addEventListener('change', applyMotion);
  addEventListener('scroll', schedule, { passive:true });
  addEventListener('resize', measure, { passive:true });
  new ResizeObserver(measure).observe(journey);
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
