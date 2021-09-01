import React, { useState, useEffect } from "react";
import People from "./components/Render";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import NotificationMessage from "./components/Notifications";
import { setNotificationMessage } from "./components/Notifications";
import personService from "./services/persons";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const getDevData = () => {
    personService
      .getData()
      .then((initialData) => {
        setPeople(initialData);
      })
      .catch((error) => {
        setNotificationMessage(
          `Could not connect to the server. Please check server connectivity and refresh the page! ${error}`,
          true,
          0
        );
      });
  };

  useEffect(getDevData, []);

  const addName = (e) => {
    e.preventDefault();
    if (newName.length < 3 || newNumber.length < 3) {
      setNotificationMessage(
        "The entered values are not allowed. must contain at least three characters",
        true,
        5000
      );
    } else {
      const indexOfExisting = people
        .map((person) => person.name)
        .indexOf(newName);
      if (indexOfExisting !== -1) {
        if (
          window.confirm(
            `${newName} is aleady added to phonebook, replace the old number with the new one?`
          )
        ) {
          const updatedNumber = {
            number: newNumber,
          };
          personService
            .updateData(people[indexOfExisting].id, updatedNumber)
            .then((returnedPerson) => {
              console.log(returnedPerson);
              setPeople(
                people.map((person) =>
                  person.id !== people[indexOfExisting].id
                    ? person
                    : returnedPerson
                )
              );
              setNotificationMessage(
                `${newName} phone number was changed`,
                false,
                5000
              );
            })
            .catch((error) => {
              setNotificationMessage(
                "error while trying to update person",
                true,
                5000
              );
            });
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        personService
          .addData(newPerson)
          .then((returnedPerson) => {
            console.log(returnedPerson);
            setPeople(people.concat(returnedPerson));
            setNotificationMessage(
              `${newName} added to phonebook`,
              false,
              5000
            );
          })
          .catch((error) => {
            setNotificationMessage(
              "error while trying to add person",
              true,
              5000
            );
          });
      }
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };
  const handeleNumberChange = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };
  const handeleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const deletePerson = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to delete ${e.target.dataset.fullname}`
      )
    ) {
      //poistaa väärän henkilön, aina ensimmäinen listassa.
      personService
        .removeData(e.target.id)
        .then((response) => {
          if (response) {
            setPeople(people.filter((person) => person.id !== e.target.id));
            setNotificationMessage(
              `Person ${e.target.dataset.fullname} was removed from the server`,
              false,
              5000
            );
          }
        })
        .catch((error) => {
          setNotificationMessage(
            `Person ${e.target.dataset.fullname} was already removed from the server, Please refresh the page.`,
            true,
            5000
          );
        });
    }
  };
  return (
    <div className="mainWindow">
      <h1>Phonebook</h1>
      <NotificationMessage key="messages" />
      <Filter
        key="filter"
        filter={filter}
        handeleFilterChange={handeleFilterChange}
      />
      <PersonForm
        key="personform"
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handeleNumberChange={handeleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <People
        key="people"
        persons={people}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
