const contactModel = require("./contacts.schema.js")


async function listContacts(req, res) {
    const data = await contactModel.find()
    return res.send(data)

}
async function getById(req, res) {
    const { id } = req.params;
    const data = await contactModel.findById(id);
    if (!data) {
        return res.status(404).send("Contact is not found")
    }
    return res.send(data);
}
async function addContact(req, res, next) {
    try {
        const data = await contactModel.create(req.body)
        res.send(data)
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send("email is duplicated")
        }
    }
}
async function updateContact(req, res, next) {
    const { id } = req.params;
    const data = await contactModel.findByIdAndUpdate(
        id,
        {
            $set: req.body
        },
        { new: true }
    )
    if (!data) {
        return res.status(400).send("contact not found")
    }
    res.send(data)
}
async function removeContact(req, res) {
    const { id } = req.params;
    const data = await contactModel.findOneAndDelete(id)
    if (!data) {
        res.status(400).send("contact not found");
    }
    res.send(data)
}

module.exports = {
    listContacts,
    getById,
    addContact,
    updateContact,
    removeContact
}