import { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input } from '@chakra-ui/react';

const Couriers = () => {
    const [couriers, setCouriers] = useState([
        { id: 1, courier_name: 'Courier 1', active: true },
        { id: 2, courier_name: 'Courier 2', active: false },
        { id: 3, courier_name: 'Courier 3', active: true },
    ]);
    const [newCourierName, setNewCourierName] = useState('');
    const [newCourierActive, setNewCourierActive] = useState(false);

    useEffect(() => {
        // fetchCouriers();
    }, []);

    const fetchCouriers = async () => {
        // Replace this with your API call to fetch couriers
        // try {
        //     const response = await axios.get('/api/admin/couriers');
        //     setCouriers(response.data);
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const handleAddCourier = async () => {
        // Replace this with your API call to add a new courier
        // try {
        //     await axios.post('/api/admin/couriers/create', {
        //         courier_name: newCourierName,
        //         active: newCourierActive ? 1 : 0
        //     });
        //     fetchCouriers();
        //     setNewCourierName('');
        //     setNewCourierActive(false);
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const handleDeleteCourier = async (id) => {
        // Replace this with your API call to delete a courier
        // try {
        //     await axios.delete(`/api/admin/couriers/destroy/${id}`);
        //     fetchCouriers();
        // } catch (error) {
        //     console.error(error);
        // }
    };

    return (
        <Box>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Courier Name</Th>
                        <Th>Active</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {couriers.map((courier) => (
                        <Tr key={courier.id}>
                            <Td>{courier.courier_name}</Td>
                            <Td>{courier.active ? 'Active' : 'Inactive'}</Td>
                            <Td>
                                <Button colorScheme="blue" size="sm" mr={2}>
                                    Edit
                                </Button>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDeleteCourier(courier.id)}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                    <Tr>
                        <Td>
                            <Input
                                value={newCourierName}
                                onChange={(e) => setNewCourierName(e.target.value)}
                                placeholder="Courier Name"
                            />
                        </Td>
                        <Td>
                            <Input
                                type="checkbox"
                                checked={newCourierActive}
                                onChange={(e) => setNewCourierActive(e.target.checked)}
                            />
                        </Td>
                        <Td>
                            <Button colorScheme="green" size="sm" onClick={handleAddCourier}>
                                Add
                            </Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
};

export default Couriers;
