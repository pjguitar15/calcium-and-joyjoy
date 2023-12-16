import { Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr,  useToast, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';

function SalesRep() {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const [salesData, setSalesData] = useState([]);



    useEffect(() => {
        const fetchCouriersAndPaymentMethods = async () => {
          setLoading(true);
          try {
            const [couriersResponse] = await Promise.all([
              axios.get("http://18.223.157.202/backend/api/admin/get_sales_report"),
             
            ]);
            
            
            const activeCouriers = couriersResponse.data.current_year
       
            setSalesData(activeCouriers);

        
        
           
          } catch (error) {
            toast({
              title: "Error loading data",
              description: error.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
          setLoading(false);
        };
    
        fetchCouriersAndPaymentMethods();
      }, [toast]);









    // Function to generate the sales report
  
   
    
    
    function downloadReport(columnNames, rows ) {
        const getSalesData = (data) => {
            const latestDate = Object.keys(data)
            .sort((a, b) => new Date(b) - new Date(a))
            [0];
    
        const formattedSalesData = data[latestDate];
    
        return formattedSalesData !== undefined ? String(formattedSalesData).replace(/,/g, '') : null;
    };
    
    const daily_sales = getSalesData(salesData.daily);
    const monthly_sales = getSalesData(salesData.monthly);
    const weekly_sales = getSalesData(salesData.weekly);
    const yearly_sales = String(salesData.yearly).replace(/,/g, '');
        const columns = ['Daily', 'Weekly', 'Monthly','Yearly'];
        const dataRows = [
          [daily_sales, monthly_sales,weekly_sales,yearly_sales],
       
          // Add more rows as needed
        ];
        // Combine column names and rows into a CSV string
        const csvData = [columns.join(','), ...dataRows.map(row => row.join(','))].join('\n');
      
        // Create a link element
        const anchor = document.createElement('a');
      
        // Set the data URL with CSV content
        anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
      
        // Set the download attribute with the specified file name
        anchor.download = 'test';
      
        // Trigger a click event to initiate the download
        anchor.click();
      }
      
      // Example usage
     
      

    return (
        
        <Box>

<Heading size="lg" mb={4}>Sales Report</Heading>

          
            <Button onClick={downloadReport}>Download Report</Button>
            
           

            <Table >
               
                
            <Tbody>
                <Tr>
                    <Td>
                        <strong>Daily</strong>
                    </Td>
                    {salesData.daily &&
                    Object.keys(salesData.daily)
                    .reverse() // Reverse the order of keys (dates)
                    .slice(0, 1) // Select only the first date
                    .map((date) => (
                        
                            <Td>{salesData.daily[date]}</Td>
                       
                    ))}
                </Tr>
                <Tr>
                    <Td>
                        <strong>Weekly</strong>
                    </Td>
                    {salesData.weekly &&
                    Object.keys(salesData.weekly)
                    .reverse() // Reverse the order of keys (dates)
                    .slice(0, 1) // Select only the first date
                    .map((date) => (
                        
                            <Td>{salesData.weekly[date]}</Td>
                    ))}
                </Tr>
                <Tr>
                    <Td>
                        <strong>Monthly</strong>
                    </Td>
                    {salesData.monthly &&
                    Object.keys(salesData.monthly)
                    .reverse() // Reverse the order of keys (dates)
                    .slice(0, 1) // Select only the first date
                    .map((date) => (
                        
                            <Td>{salesData.monthly[date]}</Td>
                    ))}
                </Tr>
                <Tr>
                    <Td>
                        <strong>Yearly</strong>
                       
                    </Td>
                    <Td>{salesData.yearly}</Td>
                </Tr>

            </Tbody>

            </Table>


        </Box>
    );
}

export default SalesRep;
