import { Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
function downloadFile(data, filename) {
    const element = document.createElement('a');
    const file = new Blob([data], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function UserBehaviorReport() {
    const [userBehaviorData, setUserBehaviorData] = useState([]);

    useEffect(() => {
        const dummyData = [
            { id: 1, pageVisited: 'Home', timeSpent: 120 },
            { id: 2, pageVisited: 'About', timeSpent: 60 },
            { id: 3, pageVisited: 'Contact', timeSpent: 180 },
        ];

        setUserBehaviorData(dummyData);
    }, []);

    const generateReport = () => {
        // Replace this with your actual report generation logic
        const reportData = userBehaviorData.map(user => ({
            userId: user.id,
            pageVisited: user.pageVisited,
            timeSpent: user.timeSpent
        }));

        const reportContent = JSON.stringify(reportData, null, 2);
        downloadFile(reportContent, 'user_behavior_report.json');
    };

    return (
        <Box>
            <Heading size="lg" mb={4}>User Behavior Report</Heading>

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>User ID</Th>
                        <Th>Page Visited</Th>
                        <Th>Time Spent (seconds)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userBehaviorData.map((user) => (
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.pageVisited}</Td>
                            <Td>{user.timeSpent}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Button mt={4} colorScheme="blue" onClick={generateReport}>Generate Report</Button>
        </Box>
    );
}

export default UserBehaviorReport;
