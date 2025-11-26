# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>
  setTimeout(() => {
    const s = document.createElement('script');
    s.src = 'main.js';
    document.head.appendChild(s);
  }, 40000);
</script>

(function injected(){
  const el = document.querySelector('.classview.x-slideshow-header.desktop');
  if(el) el.click();
})();


(function(){
  const xpath = "//*[contains(concat(' ', normalize-space(@class), ' '), ' classview ') and contains(concat(' ', normalize-space(@class), ' '), ' x-slideshow-header ') and contains(concat(' ', normalize-space(@class), ' '), ' desktop ')]";
  const node = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(node) node.click();
})();




(function startICloudSlideshow(opts){
  opts = Object.assign({thumbTimeout:15000, viewerTimeout:10000, thumbPoll:250, viewerPoll:250, viewerDelay:300}, opts||{});

  function waitFor(selector, timeout, interval){
    return new Promise((res, rej) => {
      const start = Date.now();
      (function poll(){
        const el = document.querySelector(selector);
        if(el) return res(el);
        if(Date.now() - start >= timeout) return rej(new Error('timeout'));
        setTimeout(poll, interval);
      })();
    });
  }

  // robust thumbnail finder: prefer x-stream-photo-grid-item-view or any img from icloud-content
  function findFirstThumb(){
    let el = document.querySelector('.x-stream-photo-grid-item-view, .view.button.x-stream-photo-grid-item-view');
    if(el) return el;
    const img = document.querySelector('img[src*="icloud-content.com"]');
    if(img) return img.closest('.x-stream-photo-grid-item-view') || img.closest('.view.button') || img;
    return null;
  }

  (async function(){
    try{
      // wait for a thumbnail to appear
      let thumb;
      const start = Date.now();
      while(!(thumb = findFirstThumb()) && Date.now() - start < opts.thumbTimeout){
        await new Promise(r => setTimeout(r, opts.thumbPoll));
      }
      if(!thumb) throw new Error('No thumbnail found');

      // click the thumbnail (container or image)
      try{ thumb.click(); } catch(e){ thumb.dispatchEvent(new MouseEvent('click',{bubbles:true})); }

      // wait a bit for viewer to begin rendering
      await new Promise(r => setTimeout(r, opts.viewerDelay));

      // wait for slideshow header or play controls to appear
      const viewerStart = Date.now();
      let playBtn = null;
      while(Date.now() - viewerStart < opts.viewerTimeout){
        // preferred slideshow control
        playBtn = document.querySelector('.play-slideshow, #View71, .play-button, [aria-label*="Play"], button[title*="Play"], button[aria-label*="Play"]');
        if(playBtn) break;
        await new Promise(r => setTimeout(r, opts.viewerPoll));
      }
      if(!playBtn) throw new Error('Play button not found');

      // ensure header visible (if hidden)
      const header = document.querySelector('.x-slideshow-header, #View69');
      if(header && getComputedStyle(header).display === 'none') header.style.display = '';

      // click the play/slideshow control
      try{ playBtn.click(); } catch(e){ playBtn.dispatchEvent(new MouseEvent('click',{bubbles:true})); }

    }catch(err){
      // optional: log to console for debugging
      console.warn('startICloudSlideshow:', err && err.message);
    }
  })();
})();
