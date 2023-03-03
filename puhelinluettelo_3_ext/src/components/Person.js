const Person = ({ person, handleClick }) => {
  console.log(handleClick);
  if (person.number.length > 0) {
    return (
      <li>
        {person.name} {person.number}{" "}
        <button onClick={() => handleClick(person.id, person.name)}>
          delete
        </button>
      </li>
    );
  } else {
    return <li>{person.name}</li>;
  }
};

export default Person;
