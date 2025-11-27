# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>

(function() {
    let isClickInProgress = false;
    
    setInterval(() => {
        if (!isClickInProgress) {
            isClickInProgress = true;
            
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: window.innerWidth - 10,
                clientY: window.innerHeight / 2
            });
            
            const targetElement = document.elementFromPoint(window.innerWidth - 10, window.innerHeight / 2);
            targetElement.dispatchEvent(clickEvent);
            
            // Add a small delay to prevent rapid successive clicks
            setTimeout(() => {
                isClickInProgress = false;
            }, 500);
        }
    }, 7000);
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