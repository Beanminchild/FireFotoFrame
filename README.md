# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>

function autoProgressAlbum() {
  
  const rightArrowEvent = new KeyboardEvent('keydown', {
    key: 'ArrowRight',
    keyCode: 39,
    which: 39,
    bubbles: true,
    cancelable: true
  });

  
  document.dispatchEvent(rightArrowEvent);
}


function startAutoProgress() {
  
  if (window.albumProgressInterval) {
    clearInterval(window.albumProgressInterval);
  }

  
  window.albumProgressInterval = setInterval(autoProgressAlbum, 7000);
}


window.addEventListener('load', startAutoProgress);


</script>





// new approach 

<script>(function() {
    
    const rightThirdStart = window.innerWidth * (2/3);
    
    
    const clickX = rightThirdStart + 50;  
    
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: clickX,
        clientY: 50  
    });
    
    const targetElement = document.elementFromPoint(clickX, 50);
    
    
    if (targetElement) {
        targetElement.dispatchEvent(clickEvent);
    }
})();

</script>