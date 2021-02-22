const userModel = require("../users/user.model.js")
const jwt = require("jsonwebtoken")
const { Unauthorized } = require("./error.constructors");

async function autorize(req, res, next) {
    try {
        const token = await req.header("Authorization").replace("Bearer ", "");
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(payload.userId);
        if (user) {
            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: "Not authorized" });
        }
    } catch (err) {
        return next(new Unauthorized(`Token is not valid`))
    }
}

module.exports = autorize