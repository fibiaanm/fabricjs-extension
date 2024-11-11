
export const dialogStyles = {
    window: 'fixed right-3 top-4 bg-white/70 dark:bg-neutral-800/70 rounded-lg shadow-xl p-3 backdrop-blur-lg border border-white/20 dark:border-neutral-700/50 select-none w-fit min-w-[120px] backdrop-saturate-150',
    title: 'w-full text-center text-sm font-medium text-neutral-700 dark:text-white/90 pb-2 border-b border-neutral-200/50 dark:border-neutral-700/50',
    buttons: {
        container: 'flex w-full p-2 items-center justify-around gap-2',
        applyButton: {
            el: 'group relative flex items-center gap-2 px-3 py-2 rounded-md bg-white/60 dark:bg-neutral-700/40 hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md',
            svg: 'w-5 h-5 text-green-600 dark:text-green-400 relative z-10',
            span: 'font-medium text-sm text-neutral-700 dark:text-white/90 relative z-10',
        },
        cancelButton: {
            el: 'group relative flex items-center gap-2 px-3 py-2 rounded-md bg-white/60 dark:bg-neutral-700/40 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md',
            svg: '"w-5 h-5 text-red-600 dark:text-red-400 relative z-10',
            span: 'font-medium text-sm text-red-600 dark:text-red-400 relative z-10',
        },
    },
    inputs: {
        inputsContainer: {
            el: 'p-2 space-y-3',
            container: 'group relative flex items-center gap-2 px-3 py-2 rounded-md bg-white/60 dark:bg-neutral-700/40 backdrop-blur-sm',
            label: 'text-sm font-medium text-neutral-600 dark:text-white/70 min-w-[20px]',
            input: 'w-full bg-transparent border-0 focus:outline-none text-sm text-neutral-700 dark:text-white/90 font-medium text-right',
            helper: 'absolute inset-0 rounded-md bg-gradient-to-br from-white/50 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none',
        },
        buttonsContainer: {
            el: 'flex justify-end gap-2 mt-3 pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50',
            applyButton: {
                el: 'group relative flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/60 dark:bg-neutral-700/40 hover:bg-green-500/10 dark:hover:bg-green-500/20 transition-all duration-200 backdrop-blur-sm',
                span: 'text-xs font-medium text-green-600 dark:text-green-400',
                helper: 'absolute inset-0 rounded-md bg-gradient-to-br from-white/50 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
            },
            cancelButton: {
                el: 'group relative flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/60 dark:bg-neutral-700/40 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-200 backdrop-blur-sm',
                span: 'text-xs font-medium text-red-600 dark:text-red-400',
                helper: 'absolute inset-0 rounded-md bg-gradient-to-br from-white/50 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
            }
        }
    }
}

export type TDialogStylesInputsButtons = typeof dialogStyles.inputs.buttonsContainer.applyButton;