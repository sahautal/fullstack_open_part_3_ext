const ErrorNotification = ({ message }) => {
  if (message === null || message === "" || message === undefined) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default ErrorNotification;
