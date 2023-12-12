import React, { useState, useMemo } from 'react';
import { Box, Input, Button, Heading, VStack, Text, Flex, useToast, Select } from "@chakra-ui/react";

function Customers() {
  const initialCustomers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', timestamp: '2021-01-01', suspended: false },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', timestamp: '2022-05-15', suspended: false },
    // ... more customers
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name_asc');
  const toast = useToast();

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleSuspendToggle = (customerId) => {
    setCustomers(customers.map(customer => {
      if (customer.id === customerId) {
        return { ...customer, suspended: !customer.suspended };
      }
      return customer;
    }));

    toast({
      title: "Customer status updated.",
      description: "Customer has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const sortedAndFilteredCustomers = useMemo(() => {
    return customers
      .filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortType === 'name_asc') {
          return a.name.localeCompare(b.name);
        } else if (sortType === 'name_desc') {
          return b.name.localeCompare(a.name);
        } else if (sortType === 'newest') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        } else { // oldest
          return new Date(a.timestamp) - new Date(b.timestamp);
        }
      });
  }, [customers, searchTerm, sortType]);

  return (
    <Box p="4" className="container mx-auto">
      <Heading mb="6">Our Customers</Heading>
<Flex mb="4" gap="4" alignItems="center">
  <Box flex="2"> {/* Increased flex value */}
    <Input
      placeholder="Search by name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      size="lg"
    />
  </Box>
  <Select flex="1" onChange={handleSortChange} defaultValue="name_asc" size="lg">
    <option value="name_asc">Name Ascending</option>
    <option value="name_desc">Name Descending</option>
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </Select>
</Flex>

      <VStack spacing="4" align="stretch">
        {sortedAndFilteredCustomers.map((customer) => (
          <Box
            key={customer.id}
            p="5"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="base"
            className="hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <VStack align="start">
                <Text fontWeight="bold" fontSize="lg">{customer.name}</Text>
                <Text fontSize="sm">{customer.email}</Text>
                <Text fontSize="sm" color="gray.500">Joined: {customer.timestamp}</Text>
              </VStack>
              <Button 
                colorScheme={customer.suspended ? 'red' : 'green'}
                onClick={() => handleSuspendToggle(customer.id)}
              >
                {customer.suspended ? 'Unsuspend' : 'Suspend'}
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default Customers;
