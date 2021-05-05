export const Toast = (text) => {
    if (window.M && text) {
        window.M.toast({html: text})
    }
}