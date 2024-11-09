export const makeMovable = (element: HTMLElement) => {
    let x = 0, y = 0;
    let isDown = false;

    const mouseDown = (e: MouseEvent) => {
        isDown = true;
        x = e.pageX - element.offsetLeft;
        y = e.pageY - element.offsetTop;
    }
    const mouseMove = (e: MouseEvent) => {
        if (isDown) {
            element.style.position = 'absolute';
            element.style.left = (e.pageX - x) + 'px';
            element.style.top = (e.pageY - y) + 'px';
        }
    }
    const mouseUp = () => {
        isDown = false;
    }

    element.addEventListener('mousedown', mouseDown);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    return {
        destroy: () => {
            element.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        },
        isMouseDown: () => isDown
    }
}