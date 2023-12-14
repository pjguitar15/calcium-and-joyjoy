import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const AdminDiscounts = () => {
    // Sample data for the table
    const discounts = [
        { id: 1, name: "Discount 1", amount: 10 },
        { id: 2, name: "Discount 2", amount: 20 },
        { id: 3, name: "Discount 3", amount: 30 },
    ];

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Amount</Th>
                </Tr>
            </Thead>
            <Tbody>
                {discounts.map((discount) => (
                    <Tr key={discount.id}>
                        <Td>{discount.id}</Td>
                        <Td>{discount.name}</Td>
                        <Td>{discount.amount}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default AdminDiscounts;
