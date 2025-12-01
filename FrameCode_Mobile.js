function runPlayButtonAutomation() {
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
                    el.textContent.includes('Pause')

                );

            if (stopExists) {
                console.log('Pause detected. Tap cancelled.');
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






function createConditionListener(conditionCallback, actionCallback, options = {}) {
    const {
        checkInterval = 1500,
        maxAttempts = Infinity
    } = options;

    let attempts = 0;
    let videoPlayed = false;

    function checkCondition() {
        const playVideoExists = Array.from(document.querySelectorAll('*'))
            .some(el =>
                (el.getAttribute('aria-label') && el.getAttribute('aria-label').includes('Play Video'))

            );

        if (playVideoExists && !videoPlayed) {
            videoPlayed = true;
            console.log('Condition detected!');
            runPlayVideoAutomation();

        } else if (playVideoExists && videoPlayed) {
            videoPlayed = false;
            console.log('Condition reset, ready for next detection');

        }



        attempts++;

        if (attempts < maxAttempts) {
            setTimeout(checkCondition, checkInterval);
        } else {
            console.log('Maximum attempts reached without finding condition');
        }
    }


    checkCondition();
}






function runPlayVideoAutomation() {

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

                    (el.getAttribute('aria-label') && el.getAttribute('aria-label').includes('Play Video'))
                );

            if (!stopExists) {
                console.log('Play Video not detected. Tap cancelled.');
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
            
            const x = screenWidth * .5;
            const y = screenHeight * .5;
            
            simulateTap(x, y);
        }

        triggerSlideshow();
        tapTopRight();
    }, 100);

}


let slideshowCount = 0;

function repeatAutomations() {
    
    slideshowCount++;

    setTimeout(runPlayButtonAutomation, 10000);


   
    if (slideshowCount >= 10) {
       
        window.location.href = "https://beanminchild.github.io/FireFotoFrame/";
        return; 
    }

    
    setTimeout(repeatAutomations, 30000);
}

createConditionListener();
repeatAutomations();




