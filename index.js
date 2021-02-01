const contacts = require("./contacts.js")
const argv = require('yargs').argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            contacts.listContacts().then(data => console.table(data))
            break;
        case 'get':
            contacts.getContactById(id).then(data => console.table(data))
            break;
        case 'add':
            contacts.addContact(name, email, phone).then(data => console.table(data))
            break;
        case 'remove':
            contacts.removeContact(id).then(data => console.table(data))
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);