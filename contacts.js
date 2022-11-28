const fs = require('fs').promises;
const path = require('path');
const nanoid = require('nanoid')

const contactsPath = path.resolve('./db', 'contacts.json');
// console.log('contactsPath', contactsPath);

const listContacts = async () => {
    const contactsString = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(contactsString);
    return contacts;
}

const getContactById = async (contactId) => {
    id = String(contactId);
    const allContacts = await listContacts();
    const contactById = allContacts.find(contact => contact.id === id);
    return contactById ? contactById : null;
}

const removeContact = async (contactId) => {
    id = String(contactId);
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);
    const deletedContact = allContacts[index];
    if(index !== -1) {
        allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return deletedContact ? deletedContact : null;
}

const addContact = async (name, email, phone) => {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));  
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}