# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>
function simulateRightArrowNatively() {
    // Most authentic method: Native keyboard event simulation
    const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        keyCode: 39,
        which: 39,
        bubbles: true,
        cancelable: true,
        view: window,
        composed: true,
        isTrusted: true  // This doesn't actually make it trusted, but worth trying
    });

    // Multiple dispatch methods to increase chances of working
    window.dispatchEvent(event);
    document.dispatchEvent(event);
    
    // If the above doesn't work, try triggering on the active element
    if (document.activeElement) {
        document.activeElement.dispatchEvent(event);
    }

    // Additional method: Programmatic key press
    const keyboardEventUp = new KeyboardEvent('keyup', {
        key: 'ArrowRight',
        keyCode: 39,
        which: 39,
        bubbles: true,
        cancelable: true
    });
    
    window.dispatchEvent(keyboardEventUp);
}

// Create an interval that simulates right arrow key press every 7 seconds
const slideShowInterval = setInterval(simulateRightArrowNatively, 7000);

// Optional: Stop after 5 minutes
setTimeout(() => {
    clearInterval(slideShowInterval);
    console.log('Slideshow stopped');
}, 5 * 60 * 1000);

</script>