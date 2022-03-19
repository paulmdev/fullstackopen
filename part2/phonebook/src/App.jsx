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

    if (isNameDuplicated()) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const contact = {
      name: newName,
      number: newNumber,
    };

    phonebookService
      .createContact(contact)
      .then((newContact) => setContacts([...contacts, newContact]));
    setNewName("");
    setNewNumber("");
  };

  const formHandlers = {
    handleNameChange: (event) => setNewName(event.target.value),
    handleNumberChange: (event) => setNewNumber(event.target.value),
    handleSubmitEvent,
  };

  const isNameDuplicated = () =>
    contacts.find((person) => person.name === newName);

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
