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


<script>
(function simulateCenterClicks(times = 3, delayMs = 300) {
  const cx = Math.round(window.innerWidth / 2);
  const cy = Math.round(window.innerHeight / 2);

  function dispatchPointer(type, opts) {
    try { window.dispatchEvent(new PointerEvent(type, opts)); } catch (e) {}
  }
  function dispatchMouse(target, type, opts) {
    try { target.dispatchEvent(new MouseEvent(type, opts)); } catch (e) {}
  }

  function clickOnce() {
    const opts = { bubbles: true, cancelable: true, view: window, clientX: cx, clientY: cy };
    dispatchPointer('pointerover', opts);
    dispatchPointer('pointermove', opts);
    dispatchPointer('pointerdown', opts);

    const target = document.elementFromPoint(cx, cy) || document.body;
    dispatchMouse(target, 'mouseover', opts);
    dispatchMouse(target, 'mousemove', opts);
    dispatchMouse(target, 'mousedown', opts);
    dispatchMouse(target, 'mouseup', opts);
    dispatchMouse(target, 'click', opts);

    dispatchPointer('pointerup', opts);
  }

  (async function run() {
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: cx - 10, clientY: cy - 10 }));
    await new Promise(r => setTimeout(r, 60));
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: cx + 10, clientY: cy + 10 }));
    await new Promise(r => setTimeout(r, 60));

    for (let i = 0; i < Math.max(1, times); i++) {
      clickOnce();
      await new Promise(r => setTimeout(r, delayMs));
    }
  })();
})();
</script>


// ,maybe better?

<script>(function simulateCenterClicksSlow(times = 10, intervalMs = 7000) {
  const cx = Math.round(window.innerWidth / 2);
  const cy = Math.round(window.innerHeight / 2);

  function dispatchPointer(type, opts) {
    try { window.dispatchEvent(new PointerEvent(type, opts)); } catch (e) {}
  }
  function dispatchMouse(target, type, opts) {
    try { target.dispatchEvent(new MouseEvent(type, opts)); } catch (e) {}
  }

  function clickOnce() {
    const opts = { bubbles: true, cancelable: true, view: window, clientX: cx, clientY: cy };
    dispatchPointer('pointerover', opts);
    dispatchPointer('pointermove', opts);
    dispatchPointer('pointerdown', opts);

    const target = document.elementFromPoint(cx, cy) || document.body;
    dispatchMouse(target, 'mouseover', opts);
    dispatchMouse(target, 'mousemove', opts);
    dispatchMouse(target, 'mousedown', opts);
    dispatchMouse(target, 'mouseup', opts);
    dispatchMouse(target, 'click', opts);

    dispatchPointer('pointerup', opts);
  }

  (async function run() {
    // small initial nudge to wake UI
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: cx - 10, clientY: cy - 10 }));
    await new Promise(r => setTimeout(r, 100));
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: cx + 10, clientY: cy + 10 }));
    await new Promise(r => setTimeout(r, 200));

    for (let i = 0; i < Math.max(1, times); i++) {
      clickOnce();
      if (i < times - 1) await new Promise(r => setTimeout(r, intervalMs));
    }
  })();
})();
</script>
// were making progress 
<script>(function simulateCenterClicksSlow(times = 5, intervalMs = 3000) {
  const cx = Math.round(window.innerWidth / 2);
  const cy = Math.round(window.innerHeight / 2);

  function mkOpts() {
    return {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: cx,
      clientY: cy,
      screenX: window.screenX + cx,
      screenY: window.screenY + cy,
      // pointer-specific
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
      buttons: 1
    };
  }

  function safeDispatch(target, ev) {
    try {
      const ok = target.dispatchEvent(ev);
      console.log('dispatched', ev.type, 'to', target, '->', ok);
      return ok;
    } catch (e) {
      console.warn('dispatch failed', ev.type, e);
      return false;
    }
  }

  async function clickOnce() {
    // snapshot target once
    const target = document.elementFromPoint(cx, cy) || document.body;
    console.log('target at center:', target);

    // let layout settle
    await new Promise(r => requestAnimationFrame(() => r()));

    const opts = mkOpts();

    // pointer sequence
    try {
      safeDispatch(window, new PointerEvent('pointerover', opts));
      safeDispatch(window, new PointerEvent('pointermove', opts));
      safeDispatch(window, new PointerEvent('pointerdown', opts));
    } catch (e) { console.warn('pointer events failed', e); }

    // mouse sequence on same target
    try {
      safeDispatch(target, new MouseEvent('mouseover', opts));
      safeDispatch(target, new MouseEvent('mousemove', opts));
      safeDispatch(target, new MouseEvent('mousedown', opts));
    } catch (e) { console.warn('mouse down events failed', e); }

    // small human-like press
    await new Promise(r => setTimeout(r, 120));

    try {
      safeDispatch(target, new MouseEvent('mouseup', opts));
      safeDispatch(target, new MouseEvent('click', opts));
      safeDispatch(window, new PointerEvent('pointerup', opts));
    } catch (e) { console.warn('mouseup/click failed', e); }
  }

  (async function run() {
    // wake UI
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: cx - 10, clientY: cy - 10 }));
    await new Promise(r => setTimeout(r, 80));
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: cx + 10, clientY: cy + 10 }));
    await new Promise(r => setTimeout(r, 120));

    for (let i = 0; i < Math.max(1, times); i++) {
      await clickOnce();
      if (i < times - 1) await new Promise(r => setTimeout(r, intervalMs));
    }
    console.log('run complete');
  })();
})();

</script>


// we contiune  !!!
<script>(function autoSafeCenterClickerSkipVideos(maxClicks = 100, intervalMs = 3000, firstDelayMs = 500, perClickTimeoutMs = 5000) {
  const cx = () => Math.round(window.innerWidth / 2);
  const cy = () => Math.round(window.innerHeight / 2);
  let stopped = false;

  function fireClickAt(x, y) {
    const target = document.elementFromPoint(x, y) || document.body;
    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
    try { target.dispatchEvent(new MouseEvent('mousedown', opts)); } catch {}
    setTimeout(() => {
      try { target.dispatchEvent(new MouseEvent('mouseup', opts)); } catch {}
      try { target.dispatchEvent(new MouseEvent('click', opts)); } catch {}
    }, 80);
    return target;
  }

  function centerElement() {
    return document.elementFromPoint(cx(), cy()) || document.body;
  }

  function elementKey(el) {
    if (!el) return null;
    const img = el.querySelector && (el.querySelector('img') || el.querySelector('source'));
    const vid = el.querySelector && el.querySelector('video');
    const src = vid ? (vid.currentSrc || vid.src) : img ? (img.currentSrc || img.src) : el.getAttribute && (el.getAttribute('data-photo-id') || el.id) || el.className || el.tagName;
    return src || String(el);
  }

  function waitForChangeOrTimeout(initialKey, timeoutMs) {
    return new Promise(resolve => {
      let resolved = false;
      const checkNow = () => {
        const now = centerElement();
        const nowKey = elementKey(now);
        if (nowKey !== initialKey) {
          if (!resolved) { resolved = true; cleanup(); resolve({ changed: true }); }
        }
      };
      const mo = new MutationObserver(checkNow);
      mo.observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'class', 'style', 'data-photo-id'] });
      const onAnim = () => checkNow();
      window.addEventListener('animationend', onAnim, true);
      window.addEventListener('transitionend', onAnim, true);
      const t = setTimeout(() => { if (!resolved) { resolved = true; cleanup(); resolve({ changed: false }); } }, timeoutMs);
      function cleanup() { mo.disconnect(); window.removeEventListener('animationend', onAnim, true); window.removeEventListener('transitionend', onAnim, true); clearTimeout(t); }
      checkNow();
    });
  }

  function waitForVideoStop(videoEl, timeoutMs) {
    return new Promise(resolve => {
      if (!videoEl) return resolve(true);
      if (videoEl.paused || videoEl.ended) return resolve(true);
      let resolved = false;
      const onPause = () => { if (!resolved) { resolved = true; cleanup(); resolve(true); } };
      const onEnded = () => { if (!resolved) { resolved = true; cleanup(); resolve(true); } };
      const onRemove = () => { if (!resolved) { resolved = true; cleanup(); resolve(true); } };
      const t = setTimeout(() => { if (!resolved) { resolved = true; cleanup(); resolve(false); } }, timeoutMs);
      function cleanup() {
        videoEl.removeEventListener('pause', onPause);
        videoEl.removeEventListener('ended', onEnded);
        mo.disconnect();
        clearTimeout(t);
      }
      videoEl.addEventListener('pause', onPause);
      videoEl.addEventListener('ended', onEnded);
      const mo = new MutationObserver(onRemove);
      mo.observe(videoEl, { attributes: true, childList: false, subtree: false });
    });
  }

  async function clickCycle() {
    const x = cx();
    const y = cy();
    const before = centerElement();
    const keyBefore = elementKey(before);
    const maybeTarget = fireClickAt(x, y);
    await new Promise(r => setTimeout(r, 150));
    const now = centerElement();
    const video = now && (now.tagName === 'VIDEO' ? now : (now.querySelector && now.querySelector('video')));
    if (video) {
      const stoppedByVideo = await waitForVideoStop(video, perClickTimeoutMs);
      if (!stoppedByVideo) await new Promise(r => setTimeout(r, Math.max(500, intervalMs)));
    } else {
      const res = await waitForChangeOrTimeout(keyBefore, perClickTimeoutMs);
      if (!res.changed) await new Promise(r => setTimeout(r, Math.max(500, intervalMs)));
    }
  }

  (async function run() {
    if (document.readyState === 'loading') await new Promise(r => document.addEventListener('readystatechange', function f(){ if (document.readyState !== 'loading') { document.removeEventListener('readystatechange', f); r(); }}));
    await new Promise(r => setTimeout(r, firstDelayMs));
    let count = 0;
    while (!stopped && count < maxClicks) {
      await clickCycle();
      count++;
      await new Promise(r => setTimeout(r, intervalMs));
    }
  })();

  return { stop: () => { stopped = true; } };
})();

</script>


// snapshot

<script>(function autoCenterClicker(maxClicks = 100, intervalMs = 3000, firstDelayMs = 500) {
  const cx = () => Math.round(window.innerWidth / 2);
  const cy = () => Math.round(window.innerHeight / 2);
  let stopped = false;

  function fireClickAtCenter() {
    const target = document.elementFromPoint(cx(), cy()) || document.body;
    const opts = { bubbles: true, cancelable: true, view: window, clientX: cx(), clientY: cy() };
    try { target.dispatchEvent(new MouseEvent('mousedown', opts)); } catch {}
    setTimeout(() => {
      try { target.dispatchEvent(new MouseEvent('mouseup', opts)); } catch {}
      try { target.dispatchEvent(new MouseEvent('click', opts)); } catch {}
    }, 80);
  }

  async function waitForReady() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') return;
    await new Promise(r => document.addEventListener('readystatechange', function f() { if (document.readyState !== 'loading') { document.removeEventListener('readystatechange', f); r(); } }));
  }

  (async function run() {
    await waitForReady();
    await new Promise(r => setTimeout(r, firstDelayMs));
    let count = 0;
    while (!stopped && count < maxClicks) {
      fireClickAtCenter();
      count++;
      await new Promise(r => setTimeout(r, intervalMs));
    }
  })();

  return { stop: () => { stopped = true; } };
})();

</script>