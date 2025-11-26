# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>
  setTimeout(() => {
    const s = document.createElement('script');
    s.src = 'main.js';
    document.head.appendChild(s);
  }, 40000);
</script>




(function startICloudSlideshow(opts){
  opts = Object.assign({thumbTimeout:30000, viewerTimeout:20000, poll:200, postClickDelay:600}, opts||{});

  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  function findThumb(){
    const img = document.querySelector('img[src*="icloud-content.com"]');
    if(!img) return null;
    return img.closest('.x-stream-photo-grid-item-view') || img.closest('.view.button') || img;
  }

  (async ()=>{
    const start = Date.now();
    let thumb = null;
    while(Date.now()-start < opts.thumbTimeout){
      thumb = findThumb();
      if(thumb) break;
      await sleep(opts.poll);
    }
    if(!thumb){ console.warn('Slideshow: thumbnail not found'); return; }
    console.log('Slideshow: found thumb', thumb);

   
    try{ thumb.click(); } catch(e){
      thumb.dispatchEvent(new MouseEvent('click',{bubbles:true, cancelable:true}));
    }
    await sleep(opts.postClickDelay);

  
    const vStart = Date.now();
    let header = null, play = null, item = null;
    while(Date.now()-vStart < opts.viewerTimeout){
      header = document.querySelector('.x-slideshow-header, #View69');
      play = document.querySelector('#View71, .play-slideshow, .play-button, [aria-label*="Play"], button[title*="Play"]');
      item = document.querySelector('.slideshow-page, .slideshow-item, #View68, #View1955');
      if(play) break;
      if(header || item) {
        
      }
      await sleep(opts.poll);
    }
    if(!play){
      // try to reveal header then query #View71 directly
      header = document.querySelector('#View69');
      if(header && getComputedStyle(header).display === 'none') header.style.display = '';
      play = document.querySelector('#View71');
    }
    if(!play){
      console.warn('Slideshow: play button not found; attempting keyboard / viewer click fallback');
     
      const viewerArea = document.querySelector('.slideshow-page, .slideshow-item, #View68');
      if(viewerArea){
        try{ viewerArea.click(); } catch(e){ viewerArea.dispatchEvent(new MouseEvent('click',{bubbles:true})); }
        await sleep(400);
        play = document.querySelector('#View71, .play-slideshow, .play-button, [aria-label*="Play"]');
      }
    }
    if(!play){ console.warn('Slideshow: still no play button'); return; }
    console.log('Slideshow: found play button', play);

    // make sure it's clickable
    try{ play.click(); console.log('Slideshow: clicked play'); return; }catch(e){}
    try{ play.dispatchEvent(new MouseEvent('click',{bubbles:true, cancelable:true})); console.log('Slideshow: dispatched click'); return; }catch(e){}
    // final fallback: simulate Enter/Space on the element
    try{
      play.focus && play.focus();
      const ev = new KeyboardEvent('keydown',{key:' ',code:'Space',bubbles:true});
      play.dispatchEvent(ev);
      console.log('Slideshow: sent Space key');
    }catch(e){ console.warn('Slideshow: fallback failed', e); }
  })();
})();
