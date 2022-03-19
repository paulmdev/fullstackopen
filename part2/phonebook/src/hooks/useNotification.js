import {useState} from "react";

/**
 * Returns stateful values that allow the handling of notifications.
 * @returns {[{isError: boolean, message: string },setNotification: (state: {isError?: boolean, message: string }) => void]}
 */
const useNotification = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const setNotification = ({message, isError = false}) => {
    setMessage(message);
    isError && setIsError(isError);

    // Hide in 5 seconds.
    setTimeout(() => {
      setMessage("");
      setIsError(false);
    }, 5000);
  };
  return [{message, isError}, setNotification];
};

export default useNotification;
