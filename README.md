# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

(function(){
  const SELECTOR = '#View71';
  const TIMEOUT_MS = 15000, POLL_MS = 300;
  const start = Date.now();
  (function poll(){
    const el = document.querySelector(SELECTOR);
    if (el) { el.click(); return; }
    if (Date.now() - start > TIMEOUT_MS) return;
    setTimeout(poll, POLL_MS);
  })();
})();
