export const elementInsideWindowFrame = (element: HTMLElement) => {
    const elFrame = new DOMRect(
        parseFloat(element.style.left),
        parseFloat(element.style.top),
        element.clientWidth,
        element.clientHeight
    );

    if (elFrame.top < 0) {
        element.style.top = '20px';
    }
    if (elFrame.left < 0) {
        element.style.left = '20px';
    }
    if (elFrame.bottom > window.innerHeight) {
        element.style.top = `${window.innerHeight - elFrame.height - 20}px`;
    }
    if (elFrame.right > window.innerWidth) {
        element.style.left = `${window.innerWidth - elFrame.width - 20}px`;
    }
}