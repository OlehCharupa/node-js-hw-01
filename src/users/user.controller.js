const { Types: { ObjectId } } = require("mongoose");
// const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./user.model.js");
const { Conflict, Unauthorized, NotFound, Forbidden } = require("../helpers/error.constructors.js")


async function signUp(userParams) {
    const { password, email } = userParams;
    const user = await userModel.findOne({ email });
    if (user) {
        throw new Conflict(`User with ${email} already exists`)
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const newUser = await userModel.create({
        email,
        password: hashedPassword,
    });
    return newUser
}

async function signIn(credentials) {
    const { email, password } = credentials;
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new NotFound(`User with email ${email} was not found`)
    }
    const passwordResult = await bcryptjs.compare(password, user.password);
    if (!passwordResult) {
        throw new Forbidden(`Provided password is wrong`)
    }
    const token = jwt.sign({ userId: user._id },
        process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN }
    );
    return { user, token }
}

async function currentUser(userId) {
    return await userModel.findById(userId)
}

// async function logOut(userParams) {
//     const token = userParams.signedCookies
//     return token
// }

module.exports = {
    currentUser,
    // logOut,
    signUp,
    signIn,
};