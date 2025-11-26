# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

(function rubberDuckyInject(){
  // CONFIG: adjust these if you know a better selector
  const BUTTON_SELECTORS = ['#View71', '.play-slideshow.title.view.button', 'button.play-slideshow', '[aria-label="Play"]', '[aria-label="Slideshow"]'];
  const TIMEOUT_MS = 15000;
  const POLL_MS = 300;

  function safeQuery(doc, sel){ try { return doc.querySelector(sel); } catch(e){ return null; } }

  function markButtonInDoc(doc){
    for(const s of BUTTON_SELECTORS){
      const el = safeQuery(doc, s);
      if(el){
        el.setAttribute('data-rubber-ducky','playbtn');
        return el;
      }
    }
    // fallback: try to find a small visible element with text 'Slideshow' or role=button
    const candidates = Array.from(doc.querySelectorAll('button, [role="button"], a')).filter(e=>{
      const t = (e.textContent||'').trim();
      const r = e.getBoundingClientRect();
      return (t && /slideshow|play/i.test(t)) || (r.width>8 && r.height>8 && /play|slideshow/i.test(t));
    });
    if(candidates.length){
      const el = candidates[0];
      el.setAttribute('data-rubber-ducky','playbtn');
      return el;
    }
    return null;
  }

  function clickAtCenter(el){
    if(!el) return false;
    const r = el.getBoundingClientRect();
    if(r.width === 0 && r.height === 0) return false;
    const cx = Math.round(r.left + r.width/2);
    const cy = Math.round(r.top + r.height/2);
    const opts = { bubbles:true, cancelable:true, view:window, clientX:cx, clientY:cy };
    try{
      el.dispatchEvent(new PointerEvent('pointerdown', opts));
      el.dispatchEvent(new MouseEvent('mousedown', opts));
      el.dispatchEvent(new MouseEvent('mouseup', opts));
      el.dispatchEvent(new MouseEvent('click', opts));
      el.dispatchEvent(new PointerEvent('pointerup', opts));
      return true;
    }catch(e){
      try{ el.click(); return true; }catch(e2){ console.log('RubberDucky click failed', e2); return false; }
    }
  }

  // 1) Try marking button in main document
  const mainMarked = markButtonInDoc(document);
  if(mainMarked){
    console.log('RubberDucky: marked main document button', mainMarked);
    // click the marked element (center click)
    const ok = clickAtCenter(mainMarked);
    console.log('RubberDucky: clicked main?', ok);
    return;
  }

  // 2) Try iframes (same-origin) and mark button inside them
  const iframes = Array.from(document.querySelectorAll('iframe'));
  for(const f of iframes){
    try{
      const doc = f.contentDocument;
      if(!doc) continue;
      const el = markButtonInDoc(doc);
      if(el){
        console.log('RubberDucky: marked in iframe', f.src || f.name || f);
        // attempt click inside iframe via center click on the element (coords relative to iframe)
        const r = el.getBoundingClientRect();
        const iframeRect = f.getBoundingClientRect();
        const cx = Math.round(iframeRect.left + (r.left + r.width/2));
        const cy = Math.round(iframeRect.top + (r.top + r.height/2));
        const opts = { bubbles:true, cancelable:true, view:window, clientX:cx, clientY:cy };
        try{
          // Dispatch events on iframe element (some UIs react to iframe click)
          f.dispatchEvent(new PointerEvent('pointerdown', opts));
          f.dispatchEvent(new MouseEvent('mousedown', opts));
          f.dispatchEvent(new MouseEvent('mouseup', opts));
          f.dispatchEvent(new MouseEvent('click', opts));
          f.dispatchEvent(new PointerEvent('pointerup', opts));
        }catch(e){}
        // Also try clicking the element inside the iframe directly
        try{ el.click(); }catch(e){}
        console.log('RubberDucky: attempted click in iframe');
        return;
      }
    }catch(e){
      // cross-origin iframe will throw on contentDocument access
      console.log('RubberDucky: iframe inaccessible (likely cross-origin)', f.src || f.name || f);
    }
  }

  // 3) Poll for dynamic injection (no iframe/button found yet) and try to click visible 'Slideshow' text button carefully
  const start = Date.now();
  (function poll(){
    // try finding marked element again in main doc
    const marked = document.querySelector('[data-rubber-ducky="playbtn"]') || BUTTON_SELECTORS.map(s=>safeQuery(document,s)).find(Boolean);
    if(marked){
      console.log('RubberDucky: found during poll', marked);
      const ok = clickAtCenter(marked);
      console.log('RubberDucky: clicked during poll?', ok);
      return;
    }
    // try shallow text match but prefer small bounding box (avoid clicking slides)
    const candidates = Array.from(document.querySelectorAll('button, [role="button"], a, span')).filter(e=>{
      const t = (e.textContent||'').trim();
      if(!t) return false;
      if(!/slideshow|play/i.test(t)) return false;
      const r = e.getBoundingClientRect();
      // prefer small elements (likely a control) and visible
      return r.width>10 && r.height>10 && r.width<400 && r.height<200 && r.top>=0 && r.left>=0;
    });
    if(candidates.length){
      const el = candidates[0];
      el.setAttribute('data-rubber-ducky','playbtn');
      console.log('RubberDucky: found candidate', el);
      clickAtCenter(el);
      return;
    }
    if(Date.now() - start > TIMEOUT_MS){ console.log('RubberDucky: poll timeout'); return; }
    setTimeout(poll, POLL_MS);
  })();

})();


