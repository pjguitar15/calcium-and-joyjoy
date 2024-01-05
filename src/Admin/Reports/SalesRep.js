import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Table, Tbody, Td, Th, Thead, Tr, Select, useToast, Text } from "@chakra-ui/react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axiosInstance from "../../Shared/utils/axiosInstance"; // Adjust the path as necessary

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SalesRep() {
    const [loading, setLoading] = useState(false);
    const [salesData, setSalesData] = useState({});
    const [filterType, setFilterType] = useState('daily');
    const toast = useToast();

    useEffect(() => {
        setLoading(true);
        axiosInstance.get("/admin/get_sales_report")
            .then(response => {
                setSalesData(response.data.current_year);
            })
            .catch(error => {
                toast({
                    title: "Error loading data",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .finally(() => setLoading(false));
    }, [toast]);

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const downloadReport = () => {
        let dataToDownload = salesData[filterType] || {};

        if (filterType === 'yearly') {
            dataToDownload = { 'Year': salesData.yearly };
        }

        const rows = Object.entries(dataToDownload).map(([key, value]) => [key, value]);
        const csvContent = ["Period,Sales", ...rows.map(e => e.join(","))].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `sales_report_${filterType}.csv`;
        link.click();
    };

    const parseSalesData = (data) => {
        return Object.entries(data || {}).map(([key, value]) => {
            return {
                period: key,
                sales: parseFloat(value.replace(/,/g, ''))
            };
        });
    };

    const chartData = {
        labels: parseSalesData(salesData[filterType]).map(item => item.period),
        datasets: [
            {
                label: 'Sales',
                data: parseSalesData(salesData[filterType]).map(item => item.sales),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Box>
            <Heading size="lg" mb={4}>Sales Report</Heading>

            <Select placeholder="Select period" onChange={handleFilterChange} mb={4}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </Select>

            <Button onClick={downloadReport} mb={4}>Download Report</Button>

            {loading ? <Text>Loading...</Text> : (
                <>
                    <Line data={chartData} />
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Date/Period</Th>
                                <Th>Sales</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filterType !== 'yearly' ? (
                                parseSalesData(salesData[filterType]).map(({ period, sales }) => (
                                    <Tr key={period}>
                                        <Td>{period}</Td>
                                        <Td>{sales.toLocaleString()}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td>Year</Td>
                                    <Td>{parseFloat(salesData.yearly.replace(/,/g, '')).toLocaleString()}</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </>
            )}
        </Box>
    );
}

export default SalesRep;
