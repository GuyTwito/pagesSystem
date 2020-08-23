const logger = require("./logger")

module.exports = {

    statusObject: (status, msg) => {
        let finalMessage = "Unhandled error"
        if (status === 500) {
            finalMessage = "Server Failure"
            logger.err(msg)
            msg = msg.message
        }
        if (status === 412)
            finalMessage = "Value validation error"

        finalMessage = `${finalMessage} (${msg})`

        return {
            status: status,
            message: finalMessage,
        }
    }

}