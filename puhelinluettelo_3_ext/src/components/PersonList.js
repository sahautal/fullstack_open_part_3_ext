import Person from "./Person";

const PersonList = ({ persons, handleClick }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleClick={handleClick} />
      ))}
    </ul>
  );
};

export default PersonList;
