class NotFound extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFound'
        this.status = 404
    }
}
class Conflict extends Error {
    constructor(message) {
        super(message)
        this.name = 'Conflict'
        this.status = 409
    }
}
class Forbidden extends Error {
    constructor(message) {
        super(message)
        this.name = 'Forbidden'
        this.status = 403
    }
}
class Unauthorized extends Error {
    constructor(message) {
        super(message)
        this.name = 'Unauthorized'
        this.status = 401
    }
}
module.exports = {
    NotFound, Conflict, Forbidden, Unauthorized
}