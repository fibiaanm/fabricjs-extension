import {Canvas} from "fabric";

export const simpleTouch = (canvas: Canvas) => {
    const el = canvas.getElement();

    const initial = 100;
    const end = 200;
    const step = 10;

    let position = initial;

    const touchStartEvent = new TouchEvent('touchstart', {
        touches: [new Touch({ identifier: 0, target: el, clientX: position, clientY: position })],
    });
    el.dispatchEvent(touchStartEvent);
    const interval = setInterval(() => {
        position += step;
        const touchMoveEvent = new TouchEvent('touchmove', {
            touches: [new Touch({ identifier: 0, target: el, clientX: position, clientY: position })],
        });
        el.dispatchEvent(touchMoveEvent);
        if (position >= end) {
            clearInterval(interval);
            const touchEndEvent = new TouchEvent('touchend', {
                touches: [new Touch({ identifier: 0, target: el, clientX: position, clientY: position })],
            });
            el.dispatchEvent(touchEndEvent);
        }
    }, 50);
}

export const simulatePinch = (canvas: Canvas, zoomIn: boolean = true) => {
    const el = canvas.getElement();
    
    // Center point of the pinch
    const centerX = 200;
    const centerY = 200;
    
    // Initial distance between fingers
    const initialSpread = zoomIn ? 100 : 200;  // pixels
    // Final distance between fingers
    const finalSpread = zoomIn ? 200 : 100;    // pixels
    const steps = 10;
    const stepSize = (finalSpread - initialSpread) / steps;
    
    let currentSpread = initialSpread;
    
    // Create initial two-finger touch
    const touchStart = new TouchEvent('touchstart', {
        touches: [
            new Touch({ identifier: 0, target: el, clientX: centerX - currentSpread/2, clientY: centerY }),
            new Touch({ identifier: 1, target: el, clientX: centerX + currentSpread/2, clientY: centerY })
        ],
    });
    el.dispatchEvent(touchStart);

    const interval = setInterval(() => {
        currentSpread += stepSize;
        
        // Create touch move event with updated positions
        const touchMove = new TouchEvent('touchmove', {
            touches: [
                new Touch({ identifier: 0, target: el, clientX: centerX - currentSpread/2, clientY: centerY }),
                new Touch({ identifier: 1, target: el, clientX: centerX + currentSpread/2, clientY: centerY })
            ],
        });
        el.dispatchEvent(touchMove);

        if ((zoomIn && currentSpread >= finalSpread) || (!zoomIn && currentSpread <= finalSpread)) {
            clearInterval(interval);
            
            // End the touch interaction
            const touchEnd = new TouchEvent('touchend', {
                touches: [],
                changedTouches: [
                    new Touch({ identifier: 0, target: el, clientX: centerX - currentSpread/2, clientY: centerY }),
                    new Touch({ identifier: 1, target: el, clientX: centerX + currentSpread/2, clientY: centerY })
                ],
            });
            el.dispatchEvent(touchEnd);
        }
    }, 50);
}

export const touchSetTest = (canvas: Canvas) => {
    return {
        simpleTouch: () => simpleTouch(canvas),
        pinchIn: () => simulatePinch(canvas, true),
        pinchOut: () => simulatePinch(canvas, false),
    }
}