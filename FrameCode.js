function runFullScreenAutomation() {
    setTimeout(() => {
        function wakeFullscreenButton() {
            const slideshowButton = document.querySelector('.fullscreen.title.view.button');

            if (slideshowButton) {
                // Multiple wake-up techniques
                const wakeMethods = [
                    () => {
                        // Simulate mouse hover to "activate" the button
                        const hoverEvent = new MouseEvent('mouseover', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        slideshowButton.dispatchEvent(hoverEvent);
                        console.log('Hover wake-up method triggered');
                    },
                    () => {
                        // Focus the button
                        slideshowButton.focus();
                        console.log('Focus wake-up method triggered');
                    },
                    () => {
                        // Briefly change and revert styles
                        const originalStyle = slideshowButton.getAttribute('style') || '';
                        slideshowButton.setAttribute('style', 'opacity: 0.99 !important');
                        setTimeout(() => {
                            slideshowButton.setAttribute('style', originalStyle);
                        }, 100);
                        console.log('Style wake-up method triggered');
                    }
                ];

                // Try each wake-up method
                wakeMethods.forEach(method => {
                    try {
                        method();
                    } catch (error) {
                        console.error('Wake-up method failed:', error);
                    }
                });

                // Short delay to allow wake-up to take effect
                return new Promise(resolve => {
                    setTimeout(() => {
                        console.log('Wake-up preparation complete');
                        resolve(slideshowButton);
                    }, 500);
                });
            }

            return Promise.resolve(null);
        }

        function triggerFullscreen() {
            const slideshowButton = document.querySelector('.fullscreen.title.view.button');

            if (slideshowButton) {
                // Multiple click attempts
                const clickMethods = [
                    () => slideshowButton.click(),
                    () => {
                        const clickEvent = new MouseEvent('click', {
                            view: window,
                            bubbles: true,
                            cancelable: true
                        });
                        slideshowButton.dispatchEvent(clickEvent);
                    },
                    () => {
                        // Programmatic trigger with additional events
                        slideshowButton.focus();
                        const mousedown = new MouseEvent('mousedown', { bubbles: true });
                        const mouseup = new MouseEvent('mouseup', { bubbles: true });
                        const click = new MouseEvent('click', { bubbles: true });

                        slideshowButton.dispatchEvent(mousedown);
                        slideshowButton.dispatchEvent(mouseup);
                        slideshowButton.dispatchEvent(click);
                    }
                ];

                // Try each click method
                clickMethods.forEach(method => {
                    try {
                        method();
                        console.log('Fullscreen click method attempted');
                    } catch (error) {
                        console.error('Fullscreen click failed:', error);
                    }
                });
            }
        }

        // Combine wake-up and click
        wakeFullscreenButton()
            .then(() => {
                triggerFullscreen();
                console.log('Fullscreen automation completed');
            })
            .catch(error => {
                console.error('Fullscreen automation failed:', error);
            });
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

    setTimeout(runFullScreenAutomation, 10000);
    runSlideshowAutomation();

   
    if (slideshowCount >= 5) {
       
        window.location.href = "https://beanminchild.github.io/FireFotoFrame/";
        return; 
    }

    
    setTimeout(repeatAutomations, 30000);
}


repeatAutomations();




