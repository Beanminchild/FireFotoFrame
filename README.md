# Fire-Foto-Frame
website that drives End parents Fire Foto Frame



<script>(function() {
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


</script>
// were making progress 
<script>(function() {
    setInterval(() => {
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 10,
            clientY: window.innerHeight / 2
        });
        document.elementFromPoint(window.innerWidth - 10, window.innerHeight / 2).dispatchEvent(clickEvent);
    }, 7000);
})();


</script>