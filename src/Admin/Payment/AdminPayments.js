import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const AdminPayments = () => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Payment ID</Th>
                    <Th>Amount (PHP)</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {/* Render your payment data here */}
                <Tr>
                    <Td>1</Td>
                    <Td>₱100</Td>
                    <Td>2022-01-01</Td>
                    <Td>Completed</Td>
                </Tr>
                <Tr>
                    <Td>2</Td>
                    <Td>₱50</Td>
                    <Td>2022-01-02</Td>
                    <Td>Pending</Td>
                </Tr>
            </Tbody>
        </Table>
    );
};

export default AdminPayments;
