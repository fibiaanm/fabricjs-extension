import { Canvas } from "fabric";
import { VisibilityStatus } from "../interfaces/ExecutableActions";

export const onlyVisibleWhenObjectIsSelected = (canvas: Canvas): VisibilityStatus => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return 'hidden';
    return 'visible';
}

export const onlyVisibleWhenClipboardHasContent = async (): Promise<VisibilityStatus> => {
    try {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
            // Check for JSON data
            if (item.types.includes('text/plain')) {
                try {
                    const text = await (await item.getType('text/plain')).text();
                    const parsed = JSON.parse(text);
                    if (parsed && typeof parsed === 'object') {
                        return 'visible';
                    }
                } catch {
                    // Invalid JSON, continue checking other types
                }
            }
            
            // Check for image data
            if (item.types.includes('image/png') || 
                item.types.includes('image/jpeg') || 
                item.types.includes('image/gif')) {
                return 'visible';
            }
        }
        
        return 'hidden';
    } catch (error) {
        // Fallback to legacy clipboard API for browsers that don't support clipboard.read()
        try {
            const text = await navigator.clipboard.readText();
            const parsed = JSON.parse(text);
            if (parsed && typeof parsed === 'object') {
                return 'visible';
            }
        } catch {
            // Invalid JSON or clipboard access denied
        }
        
        return 'hidden';
    }
}

