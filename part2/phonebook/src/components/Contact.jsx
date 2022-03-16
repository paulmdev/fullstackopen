import React from 'react';

const Contact = ({ person }) => (
  <li>
    {person.name} {person.number}
  </li>
);

export default Contact;
