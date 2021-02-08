const { Router } = require("express")
const router = Router()
const { listContacts, getById, addContact, updateContact, removeContact } = require("../contactfuntions/contact.controller.js")
const ValidateContacts = require("../helpers/validate.js")

router.get("/", listContacts);

router.get(
    "/:id",
    ValidateContacts.validateContactId,
    getById
);

router.post(
    "/",
    ValidateContacts.validateNewContact,
    addContact
);
router.delete(
    "/:id",
    ValidateContacts.validateContactId,
    removeContact
);
router.patch(
    "/:id",
    ValidateContacts.validateUpdateContact,
    ValidateContacts.validateContactId,
    updateContact
);

module.exports = router;

