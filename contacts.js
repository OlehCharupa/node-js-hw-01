// contacts.js
const fs = require("fs")
const { promises: fsPromises } = fs
const path = require("path")

// Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "/db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fsPromises.readFile(contactsPath, "utf-8")
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts()
    const searchContact = contacts.find(contact => contact.id === contactId)
    return searchContact
}

async function removeContact(contactId) {
    const contacts = await listContacts()
    const editListContacts = contacts.filter(contact => contact.id !== contactId)
    const newListContactsJson = JSON.stringify(editListContacts)
    fsPromises.writeFile(contactsPath, newListContactsJson)
    return editListContacts
}

async function addContact(name, email, phone) {
    const contacts = await listContacts()
    let nextId = 0
    contacts.forEach(contact => nextId = contact.id)
    const newContact = {
        id: nextId + 1,
        name,
        email,
        phone
    }
    const newContactsList = [...contacts, newContact]
    const newContactJson = JSON.stringify(newContactsList)
    fsPromises.writeFile(contactsPath, newContactJson)
    return newContactsList
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}