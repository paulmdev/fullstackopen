import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleSubmitEvent = (event) => {
    event.preventDefault();

    if (isNameDuplicated()) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const phonebookEntry = {
      name: newName,
    };

    setPersons([...persons, phonebookEntry]);
    setNewName('');
  };

  const isNameDuplicated = () =>
    persons.find((person) => person.name == newName);

  const handleNameChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitEvent}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
