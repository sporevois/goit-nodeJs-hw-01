const operations = require('./contacts');

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const list = await operations.listContacts();
            console.log('Contacts List:', list);
            break;

        case "get":
            const contact = await operations.getContactById(id);
            console.log('Contact:', contact);
            break;

        case "add":
            await operations.addContact(name, email, phone);
            console.log(`Contact ${name} was successfully added`)
            break;
        case "remove":
            await operations.removeContact(id)
            console.log("Contact deleted")
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 3 });
// invokeAction({ action: 'add', name: 'Stanislav', email: 'stas@gmail.com', phone:'555-55-55' });
// invokeAction({ action: 'remove', id:'OivLggvdZURZH09UtXJow' });
invokeAction(argv);