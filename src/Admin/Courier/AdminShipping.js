import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const AdminShipping = () => {
    const shippingData = [
        { id: 1, name: "Shipping Option 1", price: "100" },
        { id: 2, name: "Shipping Option 2", price: "200" },
        { id: 3, name: "Shipping Option 3", price: "300" },
    ];

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Shipping Option</Th>
                    <Th>Price (PHP)</Th>
                </Tr>
            </Thead>
            <Tbody>
                {shippingData.map((shipping) => (
                    <Tr key={shipping.id}>
                        <Td>{shipping.name}</Td>
                        <Td>{shipping.price} PHP</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default AdminShipping;
