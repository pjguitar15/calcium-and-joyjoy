import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import axiosInstance from '../../../Shared/utils/axiosInstance';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ name: '', role: '', permissions: '' }); // For adding/editing
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/role-permissions');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    }
  };

  const addOrUpdatePermission = async () => {
    try {
      const method = currentItem.id ? 'post' : 'put';
      const url = currentItem.id ? `/admin/role-permissions/update/${currentItem.id}` : '/admin/role-permissions/store';
      await axiosInstance[method](url, currentItem);
      fetchData();
      toast({
        title: `Permission ${currentItem.id ? 'Updated' : 'Added'}.`,
        description: `The permission has been ${currentItem.id ? 'updated' : 'added'} successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      console.error('Error updating/adding permission: ', error);
    }
  };

  const deletePermission = async (id) => {
    try {
      await axiosInstance.delete(`/admin/role-permissions/delete/${id}`);
      fetchData();
      toast({
        title: "Permission Deleted.",
        description: "The permission has been deleted successfully.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting permission: ', error);
    }
  };

  const openModal = (item = { name: '', role: '', permissions: '' }) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem({ name: '', role: '', permissions: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const actionButtons = (item) => (
    <Box>
      <Button colorScheme="blue" mr="2" size="sm" leftIcon={<FaPen />} onClick={() => openModal(item)} />
      <Button colorScheme="red" size="sm" leftIcon={<FaTrashAlt />} onClick={() => deletePermission(item.id)} />
    </Box>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button colorScheme="green" onClick={() => openModal()}>Add New Permission</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Permissions</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.role}</Td>
              <Td>{item.permissions}</Td>
              <Td>{actionButtons(item)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentItem.id ? 'Edit Permission' : 'Add Permission'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name" name="name" value={currentItem.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Input placeholder="Role" name="role" value={currentItem.role} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Permissions</FormLabel>
              <Input placeholder="Permissions" name="permissions" value={currentItem.permissions} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addOrUpdatePermission}>
              {currentItem.id ? 'Update' : 'Add'}
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableComponent;
