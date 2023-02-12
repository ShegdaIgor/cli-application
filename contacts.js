const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const result = contacts.find(
            contact => Number(contact.id) === Number(contactId)
        );
        return result || null;
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(
            contact => Number(contact.id) === Number(contactId)
        );
        if (index === -1) {
            return null;
        }
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
