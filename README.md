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








/// here zach 



(function rubberDuckyOnScreenLogger(){
  // create/replace debug panel
  const id = '__rubberducky_debug_panel';
  let panel = document.getElementById(id);
  if(panel) panel.remove();
  panel = document.createElement('div');
  panel.id = id;
  Object.assign(panel.style, {
    position: 'fixed',
    right: '8px',
    top: '8px',
    zIndex: 2147483647,
    width: '320px',
    maxHeight: '60vh',
    overflowY: 'auto',
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    fontSize: '12px',
    padding: '8px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
    lineHeight: '1.3',
    fontFamily: 'monospace'
  });
  const header = document.createElement('div');
  header.textContent = 'RubberDucky Debug';
  header.style.fontWeight = '700';
  header.style.marginBottom = '6px';
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  Object.assign(clearBtn.style, { float:'right', fontSize:'11px', marginLeft:'6px' });
  clearBtn.addEventListener('click', ()=>{ body.innerHTML=''; });
  header.appendChild(clearBtn);
  panel.appendChild(header);
  const body = document.createElement('div');
  panel.appendChild(body);
  document.documentElement.appendChild(panel);

  // helper log
  function duckLog(msg){
    const line = document.createElement('div');
    line.textContent = (new Date()).toISOString() + ' — ' + String(msg);
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    // auto-remove old lines
    if(body.children.length > 200) body.removeChild(body.children[0]);
    console.log('RubberDucky:', msg);
  }

  // expose for other injected scripts to use
  window.__rubberDuckyLog = duckLog;

  duckLog('Debug panel ready');

  // If your injector already defines a function window.rubberDuckyRun, call it and capture output.
  try {
    if(typeof window.rubberDuckyRun === 'function'){
      duckLog('Found rubberDuckyRun() — executing it now');
      const res = window.rubberDuckyRun();
      if(res && typeof res.then === 'function'){
        duckLog('rubberDuckyRun returned a Promise — waiting');
        res.then(r=>duckLog('rubberDuckyRun resolved: ' + JSON.stringify(r))).catch(e=>duckLog('rubberDuckyRun error: '+e));
      } else duckLog('rubberDuckyRun returned: ' + JSON.stringify(res));
      return;
    }
  } catch(e){ duckLog('Error calling rubberDuckyRun: '+e); }

  // If no rubberDuckyRun, run a small probe: find the button or note if iframes are inaccessible
  try {
    const sel = ['#View71', '.play-slideshow.title.view.button', '.play-slideshow', 'button', '[role="button"]'];
    let found = false;
    for(const s of sel){
      try{
        const el = document.querySelector(s);
        duckLog('query "'+s+'" -> ' + (el ? 'FOUND' : 'null'));
        if(el && !found){ found = true; el.setAttribute('data-rubberducky-probe','1'); duckLog('Marked element for visual check'); }
      }catch(e){ duckLog('selector error: '+s+' -> '+e); }
    }
    // check if any iframe is accessible
    const iframes = Array.from(document.querySelectorAll('iframe'));
    duckLog('iframes found: ' + iframes.length);
    for(const f of iframes){
      try{
        const doc = f.contentDocument;
        if(!doc) { duckLog('iframe inaccessible (no contentDocument) src:'+ (f.src||'')); continue; }
        duckLog('iframe same-origin accessible src:' + (f.src||''));
        const el = doc.querySelector('#View71') || doc.querySelector('.play-slideshow.title.view.button') || doc.querySelector('button, [role="button"]');
        duckLog('iframe query result: ' + (el ? 'FOUND' : 'null'));
      }catch(e){
        duckLog('iframe access error (cross-origin likely) src:' + (f.src||'') + ' err:' + e);
      }
    }
    if(!found) duckLog('No matching element in main document — try iframe or cross-origin');
  } catch(e){ duckLog('Probe error: '+e); }

  // small visual helper: flash any element with data-rubberducky-probe
  try{
    const el = document.querySelector('[data-rubberducky-probe="1"]');
    if(el){
      const old = el.style.boxShadow;
      el.style.boxShadow = '0 0 0 3px rgba(255,200,0,0.9)';
      setTimeout(()=> el.style.boxShadow = old, 5000);
      duckLog('Highlighted candidate element briefly');
    }
  }catch(e){}
})();
