export const withNumericEvents = (input: HTMLInputElement) => {
    input.addEventListener('keydown', (ev: KeyboardEvent) => {
        // Prevent default behavior for arrow keys
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
            ev.preventDefault();
            
            const currentValue = parseFloat(input.value) || 0;
            let increment = 1; // Default increment (units)
            
            // Check for both Shift and Control/Command keys (hundreds)
            if (ev.shiftKey && (ev.ctrlKey || ev.metaKey)) {
                increment = 100;
            }
            // Check for Shift key only (decimals)
            else if (ev.shiftKey) {
                increment = 0.1;
            }
            // Check for Control key (Windows) or Command key (Mac) only
            else if (ev.ctrlKey || ev.metaKey) {
                increment = 10; // Tens ("decenas")
            }
            
            // Increase or decrease based on arrow key
            const newValue = ev.key === 'ArrowUp' 
                ? currentValue + increment 
                : currentValue - increment;
            
            // Update input value with fixed decimals to prevent floating point issues
            input.value = newValue.toFixed(2);
            
            // Dispatch change event to notify any listeners
            input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
}