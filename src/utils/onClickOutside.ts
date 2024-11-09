export const onClickOutside = (el: HTMLElement, callback: () => void) => {
    const onClick = (e: MouseEvent) => {
        if (!el.contains(e.target as Node)) {
            callback();
            document.removeEventListener('mousedown', onClick);
            window.removeEventListener('keydown', onScape);
        }
    }
    const onScape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            callback();
            document.removeEventListener('mousedown', onClick);
            window.removeEventListener('keydown', onScape);
        }
    }
    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onScape);
    return {
        destroy: () => {
            document.removeEventListener('mousedown', onClick);
            window.removeEventListener('keydown', onScape);
        }
    }
}