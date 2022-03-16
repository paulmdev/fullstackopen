import { useState } from 'react';
import InputForm from './components/InputForm';
import ContactFilter from './components/ContactFilter';
import ContactList from './components/ContactList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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

    const phonebookEntry = {
      name: newName,
      number: newNumber,
    };

    setPersons([...persons, phonebookEntry]);
    setNewName('');
    setNewNumber('');
  };

  const formHandlers = {
    handleNameChange: (event) => setNewName(event.target.value),
    handleNumberChange: (event) => setNewNumber(event.target.value),
    handleSubmitEvent,
  };

  const isNameDuplicated = () =>
    persons.find((person) => person.name == newName);

  const handleFilterChange = (event) =>
    setFilter(event.target.value.toLowerCase());

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactFilter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <InputForm {...formValues} {...formHandlers} />
      <h2>Numbers</h2>
      <ContactList persons={persons} filter={filter} />
    </div>
  );
};

export default App;
