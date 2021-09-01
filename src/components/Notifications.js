import React from "react";

let setNotificationMessage = () => {};

const NotificationMessage = ({ props }) => {
  const [message, setMessage] = React.useState({
    message: null,
    isError: false,
  });

  console.log("notification rendered\nMessage: '" + message.message + "'");

  const errorMessage = (newMessage, newIsError) => {
    if (message) {
      clearTimeout();
    }

    setMessage({
      message: newMessage,
      isError: newIsError,
    });
  };

  const setMessageWithTimeout = (newMessage, newIsError, timeout) => {
    console.log(newMessage, newIsError, timeout);
    setMessage({
      message: newMessage,
      isError: newIsError,
    });
    setTimeout(() => {
      setMessage({ message: null, isError: false });
    }, timeout);
  };

  setNotificationMessage = (newMessage, newIsError, timeoutTime) => {
    if (timeoutTime === 0) {
      errorMessage(newMessage, newIsError);
    } else {
      setMessageWithTimeout(newMessage, newIsError, timeoutTime);
    }
  };
  if (message.message !== null) {
    if (message.isError) {
      return <div className="error">{message.message}</div>;
    } else if (!message.isError) {
      return <div className="message">{message.message}</div>;
    }
  }
  return null;
};

export { setNotificationMessage };
export default NotificationMessage;
