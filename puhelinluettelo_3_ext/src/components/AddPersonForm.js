const AddPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        <p>
          name:{" "}
          <input
            value={props.nameInputValue}
            onChange={props.handleNameChange}
          />
        </p>
        <p>
          number:{" "}
          <input
            value={props.numberInputValue}
            onChange={props.handleNumberChange}
          />
        </p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
