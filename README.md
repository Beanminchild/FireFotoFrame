# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>
  setTimeout(() => {
    const s = document.createElement('script');
    s.src = 'main.js';
    document.head.appendChild(s);
  }, 40000);
</script>




<script>
  (function () {
  'use strict';

  const TARGET_ID = 'View80';
  const PAUSED_TEXT = 'Slideshow Paused';
  const STARTED_TEXT = 'Slideshow Started';

  function getTarget() {
    return document.getElementById(TARGET_ID);
  }

  function setStarted(el) {
    if (!el) return;
    if (el.dataset.originalText === undefined) el.dataset.originalText = el.textContent || '';
    el.textContent = STARTED_TEXT;
  }

  function setPaused(el) {
    if (!el) return;
    // restore original only if we changed it earlier
    if ((el.textContent || '').trim() === STARTED_TEXT && el.dataset.originalText !== undefined) {
      el.textContent = el.dataset.originalText;
    } else if ((el.textContent || '').trim() === STARTED_TEXT) {
      // If no original stored, set to PAUSED_TEXT per request
      el.textContent = PAUSED_TEXT;
    }
  }

  // Toggle to STARTED whenever the element exists in DOM (visible or hidden),
  // and restore to PAUSED (or original) when it is removed from DOM.
  function watchExistence(el) {
    if (!el) return;
    // mark that we set it
    setStarted(el);
  }

  function unwatch(el) {
    if (!el) return;
    setPaused(el);
  }

  function init() {
    let current = getTarget();
    if (current) watchExistence(current);

    const mo = new MutationObserver(() => {
      const el = getTarget();
      if (el && el !== current) {
        if (current) unwatch(current);
        current = el;
        watchExistence(current);
      } else if (!el && current) {
        unwatch(current);
        current = null;
      }
    });

    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });

    window.addEventListener('beforeunload', () => {
      mo.disconnect();
      if (current) unwatch(current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
