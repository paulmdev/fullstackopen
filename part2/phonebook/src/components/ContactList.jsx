import Contact from './Contact';

const ContactList = ({ persons, filter }) => {
  const byPersonName = (person) => person.name.toLowerCase().includes(filter);

  return (
    <ul>
      {persons
        .filter((person) => byPersonName(person))
        .map((person) => (
          <Contact person={person} key={person.name} />
        ))}
    </ul>
  );
};

export default ContactList;
