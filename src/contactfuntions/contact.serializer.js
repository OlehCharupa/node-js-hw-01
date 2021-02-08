
function composeContacts(contacts) {
    const isArray = contacts instanceof Array;
    if (isArray) {
        return contacts.map(composeContact);
    }

    return composeContact(contacts);
}

function composeContact(contact) {
    return {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subscription: contact.subscription
    };
}

module.exports = {
    composeContacts
}