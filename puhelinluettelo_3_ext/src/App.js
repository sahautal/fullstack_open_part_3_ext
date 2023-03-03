import { useState, useEffect } from "react";
import AddPersonForm from "./components/AddPersonForm";
import FilterForm from "./components/FilterForm";
import personService from "./service/Persons";
import PersonList from "./components/PersonList";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameToFind, setNameToFind] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const hook = () => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  };
  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };

    if (persons.some(alreadyExists)) {
      //eli tämän some
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        let personToModify = persons.find(alreadyExists); //tän ja ylläolevan iffin vois yhdistää? turhaan plärätään lista kahdesti.
        personService
          .update(personToModify.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToModify.id ? person : returnedPerson
              )
            );
            setSuccessMessage(
              `Changed phone number of ${returnedPerson.name} to ${returnedPerson.number}`
            );
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Unable to add person`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (id, name) => {
    // const id=5//HARD CODED FOR TESTING
    if (window.confirm(`Do you really want to delete ${name} ?`)) {
      personService
        .deleteRecord(id)
        .then((returnedPerson) => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Deleted ${name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${newName} has already been removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNameToFindChange = (event) => {
    setNameToFind(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const alreadyExists = (person) => person.name === newName;

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage}></SuccessNotification>
      <FilterForm
        nameToFind={nameToFind}
        handleNameToFindChange={handleNameToFindChange}
      />
      <AddPersonForm
        addPerson={addPerson}
        nameInputValue={newName}
        numberInputValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList
        handleClick={deletePerson}
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(nameToFind.toLowerCase())
        )}
      ></PersonList>
    </div>
  );
};

export default App;
