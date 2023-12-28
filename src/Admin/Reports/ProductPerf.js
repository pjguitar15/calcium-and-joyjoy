import { Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr,  useToast, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from 'axios';


const ProductPerf = () => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();


    const [productPerfs, setproductPerfs] = useState([]);

    useEffect(() => {
        const fetchCouriersAndPaymentMethods = async () => {
          setLoading(true);
          try {
            const [couriersResponse] = await Promise.all([
              axios.get("http://18.223.157.202/backend/api/admin/product_performance_report"),
             
            ]);
            
            
            
            const activeCouriers = couriersResponse.data.report
       
            setproductPerfs(activeCouriers);

        
        
           
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

















    



    // Function to generate the report
    const generateReport = () => {
        // Generate the report data
        const report = productPerfs.map((data) => ({
            Product: data.product_name,
            Views: data.purchases,
            Purchases: data.total_views,
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
        <Heading size="lg" mb={4}>Product Performance</Heading>

          
<Button onClick={generateReport}  style={{ marginTop: '10px' }}>Download Report</Button>
<Table variant="simple" style={{ marginTop: '20px' }}>
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Total Views</Th>
                        <Th>Total Purchases</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {productPerfs.map((data, index) => (
                        <Tr key={index}>
                            <Td>{data.product_name}</Td>
                            <Td>{data.purchases}</Td>
                            <Td>{data.total_views}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
         
        </>
    );
};

export default ProductPerf;
