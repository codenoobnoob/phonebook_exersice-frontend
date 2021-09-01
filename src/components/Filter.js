import React from "react";

const Filter = ({ filter, handeleFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handeleFilterChange} />
    </div>
  );
};

export default Filter;
