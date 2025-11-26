# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

(function(){
  const SEL = '.play-slideshow.title.view.button';
  const timeout = 15000, interval = 300;
  const start = Date.now();
  (function poll(){
    const el = document.querySelector(SEL);
    if (el) { console.log('RubberDucky: clicked'); el.click(); return; }
    if (Date.now()-start > timeout) { console.log('RubberDucky: timeout'); return; }
    setTimeout(poll, interval);
  })();
})();

