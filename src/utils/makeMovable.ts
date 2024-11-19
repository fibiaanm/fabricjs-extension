export const makeMovable = (element: HTMLElement) => {
    let x = 0, y = 0;
    let isDown = false;

    const mouseDown = (e: MouseEvent | TouchEvent) => {
        isDown = true;
        if (e instanceof TouchEvent) {
            x = e.touches[0].clientX - element.offsetLeft;
            y = e.touches[0].clientY - element.offsetTop;
        }else {
            x = e.pageX - element.offsetLeft;
            y = e.pageY - element.offsetTop;
        }
    }
    const mouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDown) return
        if (e instanceof TouchEvent) {
            e.preventDefault();
            element.style.left = (e.touches[0].clientX - x) + 'px';
            element.style.top = (e.touches[0].clientY - y) + 'px';
        } else {
            element.style.left = (e.pageX - x) + 'px';
            element.style.top = (e.pageY - y) + 'px';
        }
    }
    const mouseUp = () => {
        isDown = false;
    }

    element.addEventListener('touchstart', mouseDown);
    element.addEventListener('touchmove', mouseMove);
    element.addEventListener('touchend', mouseUp);

    element.addEventListener('mousedown', mouseDown);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    return {
        destroy: () => {
            element.removeEventListener('touchstart', mouseDown);
            element.removeEventListener('touchmove', mouseMove);
            element.removeEventListener('touchend', mouseUp);

            element.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        },
        isMouseDown: () => isDown
    }
}