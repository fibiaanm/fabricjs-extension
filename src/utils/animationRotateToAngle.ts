import { Canvas, FabricObject } from "fabric";

export const animationRotateToAngle = ({
    activeObject,
    targetAngle,
    duration = 100,
    canvas,
    showLabel = false,
    onComplete,
}: {
    activeObject: FabricObject;
    targetAngle: number;
    duration?: number;
    canvas: Canvas;
    showLabel?: boolean;
    onComplete?: () => void;
}) => {

    if (!activeObject) return;
    const startAngle = activeObject.angle;
    const normalizedStartAngle = startAngle % 360;
    const normalizedTargetAngle = targetAngle % 360;
    let shortestRotation = normalizedTargetAngle - normalizedStartAngle;
    
    
    if (Math.abs(shortestRotation) > 180) {
        shortestRotation = shortestRotation > 0 
            ? shortestRotation - 360 
            : shortestRotation + 360;
    }

    const startTime = Date.now();
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentAnimatedAngle = startAngle + shortestRotation * easedProgress;

        activeObject.rotate(currentAnimatedAngle);
        activeObject.setCoords();

        if (showLabel) {
            canvas.fire('object:rotating', {
                target: activeObject,
                e: new MouseEvent('mousemove'),
                angle: currentAnimatedAngle
            } as any);
        }

        canvas.renderAll();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            onComplete && onComplete();
        }
    };

    animate();
}