import { Canvas, FabricObject } from "fabric";

export const animationRotateToAngle = (
    activeObject: FabricObject, 
    targetAngle: number, 
    duration: number = 100, 
    canvas: Canvas,
    onComplete?: () => void
) => {
    const startAngle = activeObject.angle;
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentAnimatedAngle = startAngle + (targetAngle - startAngle) * easedProgress;

        activeObject.rotate(currentAnimatedAngle);
        activeObject.setCoords();

        // Emitir el evento con el ángulo actual
        canvas.fire('object:rotating', {
            target: activeObject,
            e: new MouseEvent('mousemove'),
            angle: currentAnimatedAngle
        } as any);

        canvas.renderAll();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Un último evento al finalizar
            canvas.fire('object:rotating', {
                target: activeObject,
                e: new MouseEvent('mousemove'),
                angle: targetAngle
            } as any);
            onComplete && onComplete();
        }
    };

    animate();
}