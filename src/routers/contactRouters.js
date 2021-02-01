const { Router } = require("express")
const router = Router()
const ContactFunction = require("../contactfuntions/contactFunction.js")
const ValidateContacts = require("../helpers/validate.js")

router.get("/", ContactFunction.listContacts);

router.get(
    "/:id",
    ValidateContacts.validateContactId,
    ContactFunction.getById
);

router.post(
    "/",
    ValidateContacts.validateNewContact,
    ContactFunction.addContact
);
router.delete(
    "/:id",
    ValidateContacts.validateContactId,
    ContactFunction.removeContact
);
router.patch(
    "/:id",
    ValidateContacts.validateUpdateContact,
    ValidateContacts.validateContactId,
    ContactFunction.updateContact
);

module.exports = router;

