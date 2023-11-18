import { HStack, Input, Select, VStack, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";

function CheckoutConfirm({ onConfirm }) {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });
  const [region, setRegion] = useState("Philippines");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) setUserInfo(user.user_info);
  }, []);

  // const
  return (
    <VStack gap='16px' align='normal'>
      <Select
        defaultOptionLabel='Select region'
        as={RegionDropdown}
        value={region}
        onChange={(e) => setRegion(e)}
        country='Philippines'
      />
      <HStack>
        <Input placeholder='First Name' defaultValue={userInfo.firstname} />
        <Input placeholder='Last Name' defaultValue={userInfo.lastname} />
      </HStack>
      <Input placeholder='Barangay' />
      <Input placeholder='Street/Building Name' />
      <HStack>
        <Input placeholder='Postal Code' />
        <Input placeholder='City' />
      </HStack>
      <Text>Contact information:</Text>
      <Input placeholder='Email' defaultValue={userInfo.email} />
      <Input placeholder='Phone Number' defaultValue={userInfo.phone_number} />
      <Button
        onClick={onConfirm}
        borderRadius='80px'
        w='fit-content'
        mx='auto'
        px='120px'
      >
        Continue
      </Button>
    </VStack>
  );
}

export default CheckoutConfirm;
