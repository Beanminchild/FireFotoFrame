# Fire-Foto-Frame
website that drives End parents Fire Foto Frame



<script>(function() {
    const clickRight = () => {
        const evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 50,
            clientY: window.innerHeight / 2
        });
        
        const el = document.elementFromPoint(window.innerWidth - 50, window.innerHeight / 2);
        if (el) el.dispatchEvent(evt);
    };

    const slideshow = () => {
        let timer;
        const advance = () => {
            clickRight();
            timer = window.setTimeout(advance, 7000);
        };
        advance();
        return () => window.clearTimeout(timer);
    };

    slideshow();
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