# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>

(function() {
    setInterval(() => {
        const keyEvent = new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            bubbles: true,
            cancelable: true
        });
        
        document.dispatchEvent(keyEvent);
    }, 7000);  // every 7 seconds
})();


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