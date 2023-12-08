import { HStack, Input, Select, VStack, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";
import { useForm } from "react-hook-form";

function CheckoutConfirm({ onConfirm }) {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });
  const [region, setRegion] = useState("Philippines");
  const user = JSON.parse(localStorage.getItem("user"));
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (user) setUserInfo(user.user_info);
  }, []);

  const handleConfirm = (data) => {
    onConfirm({ ...data, region });
  };

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
        <Input
          placeholder='First Name'
          defaultValue={userInfo.firstname}
          {...register("first_name")}
        />
        <Input
          placeholder='Last Name'
          defaultValue={userInfo.lastname}
          {...register("last_name")}
        />
      </HStack>
      <Input placeholder='Barangay' {...register("barangay")} />
      <Input
        placeholder='Street/Building Name'
        {...register("street_bldg_name")}
      />
      <HStack>
        <Input placeholder='Postal Code' {...register("postal_code")} />
        <Input placeholder='City' {...register("city")} />
      </HStack>
      <Text>Contact information:</Text>
      <Input
        placeholder='Email'
        defaultValue={userInfo.email}
        {...register("email")}
      />
      <Input
        placeholder='Phone Number'
        defaultValue={userInfo.phone_number}
        {...register("phone_number")}
      />
      <Button
        onClick={handleSubmit(handleConfirm)}
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
