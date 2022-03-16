import { useState } from 'react';

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

  const isNameDuplicated = () =>
    persons.find((person) => person.name == newName);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilterChange = (event) =>
    setFilter(event.target.value.toLowerCase());

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with{' '}
        <input onChange={handleFilterChange} value={filter} type="text" />{' '}
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmitEvent}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter))
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
