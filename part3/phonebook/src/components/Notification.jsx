const Notification = ({ message, isError = false }) => {
  const primaryColor = isError ? "red" : "green";

  // If no message is passed, the component disappears.
  if (message === "") return null;

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        border: `2px solid ${primaryColor}`,
        borderRadius: "5px",
        color: `${primaryColor}`,
        fontSize: "20px",
        padding: "5px",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
