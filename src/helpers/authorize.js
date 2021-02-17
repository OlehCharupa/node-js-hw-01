
const jwt = require("jsonwebtoken")
const { Unauthorized } = require("./error.constructors")

function autorize(req, res, next) {
    const { token } = req.signedCookies
    let uid
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        uid = payload.userId
    } catch (err) {
        return next(new Unauthorized(`Token is not valid`))
    }
    req.userId = uid
    next()
}

module.exports = autorize