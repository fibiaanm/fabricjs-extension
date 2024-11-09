export const saveJsonToClipboard = (json: any) => {
    navigator.clipboard.write([
        new ClipboardItem({
            'text/plain': new Blob([JSON.stringify(json)], {type: 'text/plain'})
        })
    ]).then(() => {
    })
}