import { HStack, Input, Select, VStack, Text, Button } from "@chakra-ui/react";
import axios from 'axios';
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
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    if (user) setUserInfo(user.user_info);

    axios.get(`http://18.223.157.202/backend/api/user/address`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }, []);

  const handleConfirm = (data) => {
    onConfirm({ ...data, region });
  };

  return (
    <VStack gap="16px" align="normal">
      <Select
        defaultOptionLabel="Select region"
        as={RegionDropdown}
        value={region}
        onChange={(e) => setRegion(e)}
        country="Philippines"
        required
      />
      <HStack>
        <Input
          placeholder="First Name"
          {...register("first_name", { required: true })}
        />
        <Input
          placeholder="Last Name"
          {...register("last_name", { required: true })}
        />
      </HStack>
      <Input placeholder="Barangay" {...register("barangay", { required: true })} />
      <Input
        placeholder="Street/Building Name"
        {...register("street_bldg_name", { required: true })}
      />
      <HStack>
        <Input placeholder="Postal Code" {...register("postal_code", { required: true })} />
        <Input placeholder="City" {...register("city", { required: true })} />
      </HStack>
      <Text>Contact information:</Text>
      <Input placeholder="Email" {...register("email", { required: true })} />
      <Input
        placeholder="Phone Number"
        {...register("phone_number", { required: true })}
      />
      <Button
        onClick={handleSubmit(handleConfirm)}
        borderRadius="80px"
        w="fit-content"
        mx="auto"
        px="120px"
        disabled={Object.keys(formState.errors).length !== 0}
        className={`${Object.keys(formState.errors).length !== 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded`}
      >
        Continue
      </Button>
    </VStack>
  );
}

export default CheckoutConfirm;
