export const getTime = (milliseconds: string) => {
    const date = new Date(milliseconds)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    return day + '.' + month + ' ' + hours + ':' + minutes + ':' + seconds
}

export const getTimeShort = (milliseconds: string) => {
    const isToday = () => Date.now() - Date.parse(milliseconds) < 86400000
    const isYesterday = () => (Date.now() - Date.parse(milliseconds)) > 86400000 && (Date.now() - Date.parse(milliseconds)) < (86400000 * 2)
    const date = new Date(milliseconds)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    if (isToday()) {
        return 'Сегодня ' + hours + ':' + minutes + ':' + seconds
    } else if (isYesterday()) {
        return 'Вчера'
    } else {
        return day + '.' + month
    }
}