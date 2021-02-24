const { Router } = require("express");
const userRouter = Router();
const fs = require("fs").promises
const Joi = require("joi");
const path = require("path")
const Jimp = require("jimp");
const asyncWrapper = require("../helpers/asyncWrapper.js");
const validate = require("../helpers/validateHelpers.js");
const composeUsers = require("../users/users.serializer.js")
const { currentUser,
    logOut,
    signUp,
    signIn, updateAvatar } = require("../users/user.controller.js");
const authorize = require("../helpers/authorize.js")
const multer = require('multer')
const DRAFT_DIR = path.join(__dirname, '../../tmp')
const COMPRESSED_DIR = path.join(__dirname, '../../public/images')
const storage = multer.diskStorage({
    destination: DRAFT_DIR,
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
const upload = multer({ storage });
// const upload = multer({ dest: 'tmp', })
async function compressAvatar(req, res, next) {
    try {
        const { path: filePath, filename } = req.file;
        const image = await Jimp.read(filePath);
        const compressedImagePath = path.join(COMPRESSED_DIR, filename);
        await image.writeAsync(compressedImagePath);
        await fs.unlink(filePath);
        req.file.destination = COMPRESSED_DIR;
        req.file.path = compressedImagePath;
        next();
    } catch (err) {
        next(err);
    }
}
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
userRouter.patch("/users/avatars",
    authorize,
    upload.single('avatar'), compressAvatar,
    asyncWrapper(async (req, res) => {
        const user = await updateAvatar(req)
        res.send({ avatarUrl: user.avatarUrl })        // console.log(result);
    })
)
module.exports = userRouter;