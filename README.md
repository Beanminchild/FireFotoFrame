# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>

(function() {
    let isClickInProgress = false;
    
    setInterval(() => {
        if (!isClickInProgress) {
            isClickInProgress = true;
            
            const rightEdgeX = window.innerWidth - 10;
            const middleY = window.innerHeight / 2;
            
            const mouseDownEvent = new MouseEvent('mousedown', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: rightEdgeX,
                clientY: middleY
            });
            
            const targetElement = document.elementFromPoint(rightEdgeX, middleY);
            
            if (targetElement) {
                targetElement.dispatchEvent(mouseDownEvent);
                
                
                const mouseUpEvent = new MouseEvent('mouseup', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: rightEdgeX,
                    clientY: middleY
                });
                targetElement.dispatchEvent(mouseUpEvent);
            }
            
            
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