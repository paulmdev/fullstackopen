import Contact from "./Contact";
import phonebookService from "../services/phonebookService";

const ContactList = ({ contacts, filter, setContacts, setNotification }) => {
  const byContactName = (contact) =>
    contact.name.toLowerCase().includes(filter);

  const handleDelete = (contact) =>
    confirm(`Are you sure you want to delete ${contact.name}?`) &&
    phonebookService
      .deleteOne(contact.id)
      .then(() => {
        setContacts(
          contacts.filter((oldContact) => oldContact.id !== contact.id)
        );
        setNotification({ message: `Deleted ${contact.name}.` });
      })
      .catch(() => {
        setNotification({
          isError: true,
          message: `Information of ${contact.name} has already been removed from the server.`,
        });
        setContacts(
          contacts.filter((oldContact) => oldContact.id !== contact.id)
        );
      });

  return (
    <ul>
      {contacts
        .filter((contact) => byContactName(contact))
        .map((contact) => (
          <li key={contact.id}>
            <Contact contact={contact} />{" "}
            <button onClick={() => handleDelete(contact)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
