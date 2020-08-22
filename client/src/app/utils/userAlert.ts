
export default {
    message: (type: number, message: string) => {
        if (type === 1)
            console.error(`[ERROR] ${message}`)
        else
            console.log(message)
    }

}
