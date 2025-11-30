function createFullScreenListener() {
    const userInteractionEvents = [
        'mousedown', 'mouseup', 'click', 'touchstart', 'touchend',
        'keydown', 'keyup', 'mousemove'
    ];

    let lastInteractionTime = 0;

    function handleUserInteraction(event) {
        const currentTime = Date.now();


        if (currentTime - lastInteractionTime > 1000) {
            lastInteractionTime = currentTime;


            setTimeout(() => {
                try {
                    runFullScreenAutomation();
                } catch (error) {
                    console.error('Full screen automation failed:', error);
                }
            }, 1000);
        }
    }


    userInteractionEvents.forEach(eventType => {
        document.addEventListener(eventType, handleUserInteraction, { passive: true });
    });

    console.log('Full screen interaction listener activated! Quack!');
}


function runFullScreenAutomation() {
    setTimeout(() => {
        function triggerSlideshow() {
            const slideshowButton = document.querySelector('.play-slideshow.title.view.button');

            if (slideshowButton) {
                const parentView = document.getElementById('View69');
                if (parentView) {
                    parentView.style.display = 'block';
                }

                slideshowButton.click();

                console.log('Slideshow started successfully');
            } else {
                console.error('Slideshow button not found');
            }
        }

        function simulateTap(x, y) {

             const stopExists = Array.from(document.querySelectorAll('*'))
                .some(el =>
                    el.textContent.includes('Exit') ||
                    (el.getAttribute('aria-label') && el.getAttribute('aria-label').includes('Exit'))
                );

            if (stopExists) {
                console.log('Exit detected. Tap cancelled.');
                return;
            }
            const marker = document.createElement('div');
            marker.style.position = 'fixed';
            marker.style.left = `${x}px`;
            marker.style.top = `${y}px`;
            marker.style.width = '20px';
            marker.style.height = '20px';
            marker.style.backgroundColor = 'rgba(255,0,255,0.5)';
            marker.style.borderRadius = '50%';
            marker.style.zIndex = '9999';
            marker.style.pointerEvents = 'none';
            document.body.appendChild(marker);

            const targetElement = document.elementFromPoint(x, y);

            if (targetElement) {
                const methods = [
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
                    () => {
                        targetElement.click();
                    }
                ];

                methods.forEach(method => {
                    try {
                        method();
                        console.log('Tap method successful');
                    } catch (error) {
                        console.log('Tap method failed', error);
                    }
                });
            }

            setTimeout(() => {
                document.body.removeChild(marker);
            }, 2000);

            console.log(`Attempted tap at position (${x}, ${y})`);
        }

        function tapTopRight() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const x = screenWidth - 50;
            const y = 15;

            simulateTap(x, y);
        }

        triggerSlideshow();
        tapTopRight();
    }, 5000);
}




function runSlideshowAutomation() {
    setTimeout(() => {
        function triggerSlideshow() {
            const slideshowButton = document.querySelector('.play-slideshow.title.view.button');

            if (slideshowButton) {
                const parentView = document.getElementById('View69');
                if (parentView) {
                    parentView.style.display = 'block';
                }

                slideshowButton.click();

                console.log('Slideshow started successfully');
            } else {
                console.error('Slideshow button not found');
            }
        }

        function simulateTap(x, y) {

             const stopExists = Array.from(document.querySelectorAll('*'))
                .some(el =>
                    el.textContent.includes('Stop') ||
                    (el.getAttribute('aria-label') && el.getAttribute('aria-label').includes('Stop'))
                );

            if (stopExists) {
                console.log('Stop detected. Tap cancelled.');
                return;
            }
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

            const targetElement = document.elementFromPoint(x, y);

            if (targetElement) {
                const methods = [
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
                    () => {
                        targetElement.click();
                    }
                ];

                methods.forEach(method => {
                    try {
                        method();
                        console.log('Tap method successful');
                    } catch (error) {
                        console.log('Tap method failed', error);
                    }
                });
            }

            setTimeout(() => {
                document.body.removeChild(marker);
            }, 2000);

            console.log(`Attempted tap at position (${x}, ${y})`);
        }

        function tapTopRight() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const x = screenWidth - 333;
            const y = 15;

            simulateTap(x, y);
        }

        triggerSlideshow();
        tapTopRight();
    }, 5000);
}


let slideshowCount = 0;

function repeatAutomations() {
    slideshowCount++;

    // Remove the setTimeout for runFullScreenAutomation
    runSlideshowAutomation();

    if (slideshowCount >= 5) {
        window.location.href = "https://beanminchild.github.io/FireFotoFrame/";
        return;
    }

    setTimeout(repeatAutomations, 30000);
}

// Initialize the listener when the script loads
createFullScreenListener();
repeatAutomations();




