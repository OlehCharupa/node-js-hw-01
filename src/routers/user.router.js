const { Router } = require("express");
const userRouter = Router();
const Joi = require("joi");
const asyncWrapper = require("../helpers/asyncWrapper.js");
const validate = require("../helpers/validateHelpers.js");
const composeUsers = require("../users/users.serializer.js")
const { currentUser,
    logOut,
    signUp,
    signIn } = require("../users/user.controller.js");
const authorize = require("../helpers/authorize.js")

const validationRules = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

userRouter.post("/auth/register",
    validate(validationRules),
    asyncWrapper(async (req, res) => {
        const newUser = await signUp(req.body)
        console.log('newUserRoute', newUser);
        res.status(201).send(composeUsers(newUser))
    }),
);
userRouter.post("/auth/login",
    validate(validationRules),
    asyncWrapper(async (req, res) => {
        const { updateUser, token } = await signIn(req.body)
        req.token = token
        return res.status(201).send({
            user: composeUsers(updateUser),
            token
        })
    })
);

userRouter.get("/users/current",
    authorize,
    asyncWrapper(async (req, res) => {
        const user = await currentUser(req.user)
        res.send({ user: composeUsers(user), token: user.token })
    })
);
userRouter.post("/auth/logout",
    authorize,
    asyncWrapper(async (req, res) => {
        await logOut(req.user._id)
        res.status(204).json({ "massage": "No Content" })
    })
);

module.exports = userRouter;