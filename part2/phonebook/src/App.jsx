import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import ContactFilter from "./components/ContactFilter";
import ContactList from "./components/ContactList";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification";
import useNotification from "./hooks/useNotification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useNotification();

  useEffect(() => {
    phonebookService
      .getAll()
      .then((contacts) => setContacts(contacts))
      .catch((error) => setNotification({ message: error, isError: true }));
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
      const confirmMessage = `${newName} is already added to the phonebook, replace the old number with a new one?`;
      if (!confirm(confirmMessage)) return;

      const contactId = getIdByName(newName);

      return phonebookService
        .changeOne(contactId, contact)
        .then((changedContact) => {
          const newContacts = contacts.filter(
            (contactItem) => contactItem.id !== contactId
          );
          setContacts([...newContacts, changedContact]);
          setNotification({
            message: `Changed ${changedContact.name} number to ${changedContact.number}.`,
          });
        })
        .catch(() =>
          setNotification({
            isError: true,
            message: `Information of ${contact.name} has already been removed from the server.`,
          })
        );
    }

    phonebookService.createContact(contact).then((newContact) => {
      setContacts([...contacts, newContact]);
      setNotification({ message: `Added ${newContact.name}.` });
    });
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
      <Notification {...notification} />
      <ContactFilter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <InputForm {...formValues} {...formHandlers} />
      <h2>Numbers</h2>
      <ContactList
        contacts={contacts}
        filter={filter}
        setContacts={setContacts}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
