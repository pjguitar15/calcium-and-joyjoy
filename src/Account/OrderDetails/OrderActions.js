import React, { useState } from "react";
import { Box, Input, Button, Select } from "@chakra-ui/react";

const OrderActions = ({ onSortChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <Box display="flex" alignItems="center" gap="2">
      <Select placeholder="Sort by" onChange={handleSortChange}>
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest First</option>
      </Select>
      <Input
        placeholder="Search by Reference Number"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button onClick={handleSearchSubmit}>Search</Button>
    </Box>
  );
};

export default OrderActions;
