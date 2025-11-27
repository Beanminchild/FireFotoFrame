function triggerSlideshow() {
    // Find the slideshow button by its text or class
    const slideshowButton = document.querySelector('.play-slideshow.title.view.button');
    
    if (slideshowButton) {
        // Make the parent div visible if it's hidden
        const parentView = document.getElementById('View69');
        if (parentView) {
            parentView.style.display = 'block';
        }
        
        // Trigger the button click
        slideshowButton.click();
        
        console.log('Slideshow started successfully');
    } else {
        console.error('Slideshow button not found');
    }
}

// Run the function
triggerSlideshow();


function simulateTap(x, y) {
    // Create debug marker
    const marker = document.createElement('div');
    marker.style.position = 'fixed';
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    marker.style.width = '20px';
    marker.style.height = '20px';
    marker.style.backgroundColor = 'rgba(255,0,0,0.5)';
    marker.style.borderRadius = '50%';
    marker.style.zIndex = '9999';
    marker.style.pointerEvents = 'none';
    document.body.appendChild(marker);

    // Get element at tap location
    const targetElement = document.elementFromPoint(x, y);

    if (targetElement) {
        // Multiple interaction methods
        const methods = [
            // Method 1: Touch events
            () => {
                const touch = new Touch({
                    identifier: Date.now(),
                    target: targetElement,
                    clientX: x,
                    clientY: y
                });

                const touchStartEvent = new TouchEvent('touchstart', {
                    bubbles: true,
                    cancelable: true,
                    touches: [touch],
                    targetTouches: [touch],
                    changedTouches: [touch]
                });

                const touchEndEvent = new TouchEvent('touchend', {
                    bubbles: true,
                    cancelable: true,
                    touches: [],
                    targetTouches: [],
                    changedTouches: [touch]
                });

                targetElement.dispatchEvent(touchStartEvent);
                targetElement.dispatchEvent(touchEndEvent);
            },

            // Method 2: Mouse events
            () => {
                const mouseEvents = ['mouseenter', 'mouseover', 'mousedown', 'mouseup', 'click'];
                mouseEvents.forEach(eventType => {
                    const mouseEvent = new MouseEvent(eventType, {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        clientX: x,
                        clientY: y
                    });
                    targetElement.dispatchEvent(mouseEvent);
                });
            },

            // Method 3: Direct click
            () => {
                targetElement.click();
            }
        ];

        // Try all methods
        methods.forEach(method => {
            try {
                method();
                console.log('Tap method successful');
            } catch (error) {
                console.log('Tap method failed', error);
            }
        });
    }

    // Remove marker after 2 seconds
    setTimeout(() => {
        document.body.removeChild(marker);
    }, 2000);

    console.log(`Attempted tap at position (${x}, ${y})`);
}

// Example usage for top-right area
function tapTopRight() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Tap near top-right, slightly inset from the edge
    const x = screenWidth - 333;  // 50 pixels from right edge
    const y = 15;  // 50 pixels from top edge
    
    simulateTap(x, y);
}

// Run the tap function
tapTopRight();





