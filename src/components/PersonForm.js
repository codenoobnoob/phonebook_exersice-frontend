import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handeleNumberChange,
  addName,
}) => {
  return (
    <form onSubmit={addName}>
      <h2>add new contact</h2>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handeleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
