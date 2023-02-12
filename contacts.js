const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
}

function getContactById(contactId) {
    // ...твой код
}

function removeContact(contactId) {
    // ...твой код
}

function addContact(name, email, phone) {
    // ...твой код
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
