# Fire-Foto-Frame
website that drives End parents Fire Foto Frame



<script>(function() {
    const advanceSlide = () => {
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 10,
            clientY: window.innerHeight / 2
        });
        
        const targetElement = document.elementFromPoint(window.innerWidth - 10, window.innerHeight / 2);
        targetElement.dispatchEvent(clickEvent);
    };

    const startSlideshow = () => {
        let timer;
        const runSlideshow = () => {
            advanceSlide();
            timer = setTimeout(runSlideshow, 7000);
        };
        
        runSlideshow();
        
        return () => clearTimeout(timer);
    };

    const stopSlideshow = startSlideshow();
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