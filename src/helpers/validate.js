const Joi = require("joi")
const contacts = require("../db/contacts.json")

class ValidateContacts {
    validateNewContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
        });
        const validationResult = validationRules.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({"message" : "missing required name field"});
        }
        next();
    }
    validateUpdateContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
        }).or("name", "email", "phone");
        const validationResult = validationRules.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({"message" : "missing fields"});
        }
        next();
    }
    validateContactId = (req, res, next) => {
        const { id } = req.params;
        const contactId = parseInt(id)
        const contactIndex = contacts.findIndex(({ id }) => id === contactId)
        if (contactIndex === -1) {
            return res.status(404).send({"message" : "contact not found"});
        }
        next();
    }
}
module.exports = new ValidateContacts()