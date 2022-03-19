import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import ContactFilter from "./components/ContactFilter";
import ContactList from "./components/ContactList";
import phonebookService from "./services/phonebookService";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((contacts) => setContacts(contacts));
  }, []);

  const formValues = {
    newName,
    newNumber,
  };

  const handleSubmitEvent = (event) => {
    event.preventDefault();

    const contact = {
      name: newName,
      number: newNumber,
    };

    if (isNameDuplicated(newName)) {
      if (
        !confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      )
        return;

      const contactId = getIdByName(newName);

      return phonebookService
        .changeOne(contactId, contact)
        .then((changedContact) => {
          const newContacts = contacts.filter(
            (contactItem) => contactItem.id !== contactId
          );
          setContacts([...newContacts, changedContact]);
        });
    }

    phonebookService
      .createContact(contact)
      .then((newContact) => setContacts([...contacts, newContact]));
    setNewName("");
    setNewNumber("");
  };

  /**
   * Gets an id of a contact that matches the given name.
   * @param name {string}
   * @returns {int}
   */
  const getIdByName = (name) =>
    contacts.find((contact) => contact.name === name).id;

  /**
   * Checks if a name exists in the contacts array.
   * @param name {string}
   * @returns {boolean}
   */
  const isNameDuplicated = (name) =>
    contacts.some((person) => person.name === name);

  const formHandlers = {
    handleNameChange: (event) => setNewName(event.target.value),
    handleNumberChange: (event) => setNewNumber(event.target.value),
    handleSubmitEvent,
  };

  const handleFilterChange = (event) =>
    setFilter(event.target.value.toLowerCase());

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactFilter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <InputForm {...formValues} {...formHandlers} />
      <h2>Numbers</h2>
      <ContactList
        contacts={contacts}
        filter={filter}
        setContacts={setContacts}
      />
    </div>
  );
};

export default App;
