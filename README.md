# Fire-Foto-Frame
website that drives End parents Fire Foto Frame

<script>

  function simulateRightArrowNatively() {
    try {
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            keyCode: 39,
            which: 39,
            bubbles: true,
            cancelable: true
        });
        
        const body = document.body;
        if (body) {
            body.dispatchEvent(event);
        }
        
        const activeElement = document.activeElement;
        if (activeElement) {
            activeElement.dispatchEvent(event);
        }
        
        const nextButton = document.querySelector('button[aria-label="Next"], [data-testid="next-button"]');
        if (nextButton) {
            nextButton.click();
        }
    } catch (error) {
        console.error('Navigation error:', error);
    }
}

setInterval(simulateRightArrowNatively, 7000);
</script>
