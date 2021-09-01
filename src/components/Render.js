import React from "react";

const DeleteButton = ({ id, name, deleteFunction }) => {
  return (
    <button
      id={id}
      data-fullname={name}
      style={{ marginLeft: 5 }}
      onClick={deleteFunction}
    >
      delete
    </button>
  );
};

const ListPerson = ({ id, name, number, deletePerson }) => {
  return (
    <p>
      {name} {number}
      <DeleteButton id={id} name={name} deleteFunction={deletePerson} />
    </p>
  );
};

const People = ({ persons, filter, deletePerson }) => {
  const renderList = [];
  persons.forEach((person) => {
    if (
      filter === "" ||
      person.name.toLowerCase().includes(filter.toLowerCase())
    ) {
      renderList.push(
        <ListPerson
          key={person.name}
          id={person.id}
          name={person.name}
          number={person.number}
          deletePerson={deletePerson}
        />
      );
    }
  });
  return renderList;
};

export default People;
