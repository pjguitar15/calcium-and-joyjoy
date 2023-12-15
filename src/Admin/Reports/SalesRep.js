import { Box, Button, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";

function SalesRep() {
    const [salesData, setSalesData] = useState([]);

    // Function to generate the sales report
    const generateReport = () => {
        // Logic to fetch sales data from API or database
        // Replace this with your actual implementation
        const fetchedSalesData = [
            { id: 1, product: "Product A", quantity: 10, price: 100 },
            { id: 2, product: "Product B", quantity: 5, price: 200 },
            { id: 3, product: "Product C", quantity: 8, price: 150 },
        ];

        setSalesData(fetchedSalesData);
    };

    // Function to download the generated report
    const downloadReport = () => {
        // Convert salesData to CSV format
        const csvData = salesData.map(sale => Object.values(sale).join(',')).join('\n');
        
        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
        anchor.download = 'sales_report.csv';
        anchor.click();
    };

    return (
        <Box>
            <Button onClick={generateReport}>Generate Report</Button>
            <Button onClick={downloadReport}>Download Report</Button>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Product</Th>
                        <Th>Quantity</Th>
                        <Th>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {salesData.map((sale) => (
                        <Tr key={sale.id}>
                            <Td>{sale.id}</Td>
                            <Td>{sale.product}</Td>
                            <Td>{sale.quantity}</Td>
                            <Td>{sale.price}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}

export default SalesRep;
