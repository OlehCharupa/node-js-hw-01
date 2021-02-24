const AvatarGenerator = require("avatar-generator")
const fs = require("fs").promises
const path = require("path")


async function avatarNewUser(next) {
    try {
        const avatar = new AvatarGenerator()
        const fileName = `${Date.now()}.png`
        const image = await avatar.generate(fileName, "male")
        await image.png().toFile(path.join(__dirname, `../../tmp/${fileName}`))
        await fs.copyFile(path.join(__dirname, `../../tmp/${fileName}`),
            path.join(__dirname, `../../public/images/${fileName}`))
        await fs.unlink(path.join(__dirname, `../../tmp/${fileName}`))
        const avatarUrl = `http://localhost:${process.env.PORT}/images/${fileName}`
        return avatarUrl
    } catch (error) {
        next(error)
    }
}
module.exports = avatarNewUser