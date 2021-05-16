export const Toast = (text: string) => {
    if (window.M && text) {
        window.M.toast({html: text})
    }
}