import Contact from './Contact';

const ContactList = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Contact person={person} key={person.name} />
        ))}
    </ul>
  );
};

export default ContactList;
