// 获取当前时间 返回 早上好 上午好 下午好 晚上好
export const getTime = () => {
    const time = new Date().getHours()
    let message = ''
    if (time <= 8) {
        message = 'Hi! 早上好 '
    } else if (time <= 12) {
        message = 'Hi! 上午好! '
    } else if (time <= 18) {
        message = 'Hi! 下午好！'
    } else {
        message = 'Hi! 晚上好！'
    }
    return message
}
