import { Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr,  useToast, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
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
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchCouriersAndPaymentMethods = async () => {
          setLoading(true);
          try {
            const [couriersResponse] = await Promise.all([
              axios.get("http://18.223.157.202/backend/api/admin/customer_behavior"),
             
            ]);
            
         
            const activeCouriers = couriersResponse.data
          
            setUserBehaviorData(activeCouriers);
           
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




    

      const generateReport = () => {
        // Flatten the nested structure and create a new array with the desired format
        const flatData = userBehaviorData.map(user => {
            return user.activity_logs.map(activity => {
                return {
                    Username: user.user_name,
                    'Page name': `${activity.page_name}(${activity.count})`,
                };
            });
        }).flat();
    
        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(flatData);
    
        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    
        // Convert the workbook to a binary Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    
        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(excelBuffer)], { type: 'application/octet-stream' });
    
        // Save the file using FileSaver.js
        saveAs(blob, 'activity_report.xlsx');
    };
    
    // Utility function to convert string to ArrayBuffer
    const s2ab = s => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };
   
    
    

    return (
        <Box>
            <Heading size="lg" mb={4}>User Behavior Report</Heading>

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Page Visited</Th>
                       
                    </Tr>
                </Thead>
                <Tbody>
                    {userBehaviorData.map((user) => (
                        <Tr key={user.id}>
                        <Td>{user.user_name}</Td>
                        <Td>
                            {user.activity_logs.map((log, index) => (
                            <span key={index}>{log.page_name}({log.count}) &nbsp;</span>
                            ))}
                        </Td>
                     
                        </Tr>
                    ))}
                    </Tbody>

            </Table>

            <Button mt={4} colorScheme="blue" onClick={generateReport}>Generate Report</Button>
        </Box>
    );
}

export default UserBehaviorReport;
