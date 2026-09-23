// Run before the page is parsed so saved anchors cannot skip the opening film.
(() => {
  'use strict';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function clearEntryAnchor() {
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  }
  function startAtTop() {
    clearEntryAnchor();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  let interacted = false;
  const noteInteraction = () => { interacted = true; };
  ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(type =>
    window.addEventListener(type, noteInteraction, { passive: true, capture: true })
  );
  startAtTop();
  window.addEventListener('pageshow', event => {
    // Do not undo navigation or scrolling started while assets were loading.
    if (event.persisted || !interacted) startAtTop();
  });
})();
