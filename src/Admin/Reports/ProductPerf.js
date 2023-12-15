import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const ProductPerf = () => {
    // Sample data for the table
    const reportData = [
        { product: 'Product 1', sales: 100, revenue: 1000 },
        { product: 'Product 2', sales: 200, revenue: 2000 },
        { product: 'Product 3', sales: 300, revenue: 3000 },
    ];

    // Function to generate the report
    const generateReport = () => {
        // Generate the report data
        const report = reportData.map((data) => ({
            Product: data.product,
            Sales: data.sales,
            Revenue: data.revenue,
        }));

        // Convert the report data to CSV format
        const csv = [
            Object.keys(report[0]).join(','),
            ...report.map((row) => Object.values(row).join(',')),
        ].join('\n');

        // Create a temporary anchor element to download the report
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        downloadLink.download = 'product_performance_report.csv';
        downloadLink.click();
    };

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Sales</Th>
                        <Th>Revenue</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reportData.map((data, index) => (
                        <Tr key={index}>
                            <Td>{data.product}</Td>
                            <Td>{data.sales}</Td>
                            <Td>{data.revenue}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <button onClick={generateReport}>Generate Report</button>
        </>
    );
};

export default ProductPerf;
