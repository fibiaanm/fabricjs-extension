
export const contextMenuStyles = {
    container: 'fixed bg-white/70 dark:bg-neutral-800/70 rounded-lg shadow-xl p-3 backdrop-blur-lg border border-white/20 dark:border-neutral-700/50 select-none min-w-[200px] backdrop-saturate-150',
    list: {
        el: 'space-y-1',
        element: {
            el: 'group relative px-3 py-2 rounded-md bg-white/60 dark:bg-neutral-700/40 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 cursor-pointer flex items-center gap-3 text-neutral-700 dark:text-white/90 transition-all duration-200',
            helper: 'absolute inset-0 rounded-md bg-gradient-to-br from-white/50 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            svg: 'w-4 h-4 relative z-10',
            span: 'font-medium relative z-10',
            shortcut: 'ml-auto text-xs text-neutral-500 dark:text-neutral-400 relative z-10'
        }
    }
}