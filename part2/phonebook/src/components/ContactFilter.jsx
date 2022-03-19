import React from "react";

const ContactFilter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input onChange={handleFilterChange} value={filter} type="text" />{" "}
    </div>
  );
};

export default ContactFilter;
