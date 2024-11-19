import { ShortcutDetail } from "../actions/interfaces/ExecutableActions";
import { getOS } from "./getOS";

export const buildShortcutString = (shortcut: ShortcutDetail | any) => {
    const os = getOS();
    const keys = [];

    if (shortcut.shift) keys.push('⇧');
    if (shortcut.alt) keys.push(os === 'Mac' ? '⌥' : 'Alt');
    
    // Handle Ctrl/Cmd based on OS
    if (os === 'Mac') {
        if (shortcut.meta || shortcut.ctrl) keys.push('⌘');
    } else {
        if (shortcut.ctrl || shortcut.meta) keys.push('Ctrl');
    }

    // Convert key to uppercase for single characters
    const key = shortcut.key.length === 1 
        ? shortcut.key.toUpperCase() 
        : shortcut.key;
    
    keys.push(key);
    
    return keys.join('+');
}