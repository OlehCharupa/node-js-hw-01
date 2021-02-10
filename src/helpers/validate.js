const Joi = require("joi");
const { Types: { ObjectId } } = require("mongoose");

class ValidateContacts {
    validateNewContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            subscription: Joi.string(),
            password: Joi.string().required()
        });
        const validationResult = validationRules.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({ "message": "missing required name field" });
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
            return res.status(400).send({ "message": "missing fields" });
        }
        next();
    }
    validateContactId = (req, res, next) => {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(404).send("ID is not found");
        }
        next();
    }
}
module.exports = new ValidateContacts()