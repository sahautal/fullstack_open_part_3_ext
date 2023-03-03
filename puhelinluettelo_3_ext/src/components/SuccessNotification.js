const SuccessNotification = ({ message }) => {
  if (message === null || message === "" || message === undefined) {
    return null;
  }

  return <div className="success">{message}</div>;
};

export default SuccessNotification;
