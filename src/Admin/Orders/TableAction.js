import React, { useState } from 'react';

const TableActions = ({ onSortChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-between mb-4">
      <select onChange={handleSortChange} className="border p-2 rounded">
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
      </select>
      <input
        type="text"
        placeholder="Search by Order Number"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default TableActions;
