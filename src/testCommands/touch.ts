import {Canvas, Circle} from "fabric";

interface TouchIndicator {
    circle: Circle;
    identifier: number;
}

const createTouchIndicator = (canvas: Canvas, x: number, y: number, identifier: number): TouchIndicator => {
    const circle = new Circle({
        left: x - 15,  // Offset by radius to center the circle on touch point
        top: y - 15,
        radius: 15,
        fill: 'rgba(75, 192, 192, 0.3)',
        stroke: 'rgba(75, 192, 192, 0.8)',
        strokeWidth: 2,
        selectable: false,
        evented: false,
    });

    canvas.add(circle);
    return { circle, identifier };
};

const updateTouchIndicator = (indicator: TouchIndicator, x: number, y: number) => {
    indicator.circle.set({
        left: x - 15,
        top: y - 15,
    });
    indicator.circle.canvas?.renderAll();
};

const removeTouchIndicator = (indicator: TouchIndicator) => {
    indicator.circle.canvas?.remove(indicator.circle);
};

export const simpleTouch = (canvas: Canvas) => {
    const el = canvas.getElement();
    const initial = 100;
    const end = 200;
    const step = 10;
    let position = initial;

    // Create initial touch indicator
    const touchIndicator = createTouchIndicator(canvas, position, position, 0);

    const touchStartEvent = new TouchEvent('touchstart', {
        touches: [new Touch({ identifier: 0, target: el, clientX: position, clientY: position })],
    });
    el.dispatchEvent(touchStartEvent);

    const interval = setInterval(() => {
        position += step;

        // Update touch indicator position
        updateTouchIndicator(touchIndicator, position, position);

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

            // Remove touch indicator after a short delay
            setTimeout(() => {
                removeTouchIndicator(touchIndicator);
            }, 300);
        }
    }, 50);
}

export const simulatePinch = (canvas: Canvas, zoomIn: boolean = true) => {
    const el = canvas.getElement();
    const centerX = 200;
    const centerY = 200;
    const initialSpread = zoomIn ? 100 : 200;
    const finalSpread = zoomIn ? 200 : 100;
    const steps = 10;
    const stepSize = (finalSpread - initialSpread) / steps;
    let currentSpread = initialSpread;

    // Create two touch indicators
    const touchIndicator1 = createTouchIndicator(
        canvas,
        centerX - currentSpread/2,
        centerY,
        0
    );
    const touchIndicator2 = createTouchIndicator(
        canvas,
        centerX + currentSpread/2,
        centerY,
        1
    );

    const touchStart = new TouchEvent('touchstart', {
        touches: [
            new Touch({ identifier: 0, target: el, clientX: centerX - currentSpread/2, clientY: centerY }),
            new Touch({ identifier: 1, target: el, clientX: centerX + currentSpread/2, clientY: centerY })
        ],
    });
    el.dispatchEvent(touchStart);

    const interval = setInterval(() => {
        currentSpread += stepSize;

        // Update touch indicators positions
        updateTouchIndicator(touchIndicator1, centerX - currentSpread/2, centerY);
        updateTouchIndicator(touchIndicator2, centerX + currentSpread/2, centerY);

        const touchMove = new TouchEvent('touchmove', {
            touches: [
                new Touch({ identifier: 0, target: el, clientX: centerX - currentSpread/2, clientY: centerY }),
                new Touch({ identifier: 1, target: el, clientX: centerX + currentSpread/2, clientY: centerY })
            ],
        });
        el.dispatchEvent(touchMove);

        if ((zoomIn && currentSpread >= finalSpread) || (!zoomIn && currentSpread <= finalSpread)) {
            clearInterval(interval);
            const touchEnd = new TouchEvent('touchend', {
                touches: [],
                changedTouches: [
                    new Touch({ identifier: 0, target: el, clientX: centerX - currentSpread/2, clientY: centerY }),
                    new Touch({ identifier: 1, target: el, clientX: centerX + currentSpread/2, clientY: centerY })
                ],
            });
            el.dispatchEvent(touchEnd);

            // Remove touch indicators after a short delay
            setTimeout(() => {
                removeTouchIndicator(touchIndicator1);
                removeTouchIndicator(touchIndicator2);
            }, 300);
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