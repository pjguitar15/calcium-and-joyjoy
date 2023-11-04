import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { VscDashboard } from "react-icons/vsc";
import { BsFillPeopleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const menu = [
    {
      main: "User Management",
      icon: VscDashboard,
    },
  ];

  const dummyMenu = Array.from({
    length: 5,
  });

  return (
    <Box
      pos='fixed'
      left='0'
      w='350px'
      bgColor='gray.600'
      color='white'
      h='100%'
    >
      <VStack fontSize='18px' py='24px'>
        <Image src='/assets/logoheader.png' />
        <Text fontSize='32px'>Admin Dashboard</Text>
        <Divider w='80%' />

        <HStack
          as={NavLink}
          to='/admin'
          end
          cursor='pointer'
          w='100%'
          py='16px'
          justify='center'
          gap='16px'
        >
          <Icon fontSize='24px' as={VscDashboard} />
          <Text>Dashboard Overview</Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Dashboard;
