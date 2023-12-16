import React from 'react';
import { Input, Flex, Button } from "@chakra-ui/react";

const SearchBar = ({ searchTerm, setSearchTerm, sortByDate, toggleSortByDate }) => {
    return (
        <Flex mb="4" mt="4" justify="space-between">
            <Input 
                placeholder="Search by Reference Number" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button onClick={toggleSortByDate}>
                Sort by Date: {sortByDate ? 'Oldest' : 'Recent'}
            </Button>
        </Flex>
    );
};

export default SearchBar;
