import React from "react";

const Contact = ({ contact }) => (
  <span>
    {contact.name} {contact.number}
  </span>
);

export default Contact;
