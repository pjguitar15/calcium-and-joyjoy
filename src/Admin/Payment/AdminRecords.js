import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const AdminRecords = () => {
    const records = [
        { id: 1, name: "John Doe", amount: 1000 },
        { id: 2, name: "Jane Smith", amount: 2000 },
        { id: 3, name: "Mike Johnson", amount: 1500 },
    ];

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Amount (PHP)</Th>
                </Tr>
            </Thead>
            <Tbody>
                {records.map((record) => (
                    <Tr key={record.id}>
                        <Td>{record.id}</Td>
                        <Td>{record.name}</Td>
                        <Td>{record.amount} PHP</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default AdminRecords;
