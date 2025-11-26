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
