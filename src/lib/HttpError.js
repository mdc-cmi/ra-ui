class HttpError extends Error {
    constructor(message, status) {
        super(message)
        this.message = message
        this.status = status
        this.name = this.constructor.name
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor)
        } else {
            this.stack = (new Error(message)).stack
        }
        this.stack = new Error().stack
    }
}

export default HttpError
