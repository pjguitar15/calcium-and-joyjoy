import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AccountDetails() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return navigate("/");

  const { firstname, lastname, email } = user.user_info;

  const fields = [
    {
      label: "First Name",
      id: "firstname",
      defaultVal: firstname,
    },
    {
      label: "Last Name",
      id: "lastname",
      defaultVal: lastname,
    },
    {
      label: "Email",
      id: "email",
      defaultVal: email,
    },
    {
      label: "Phone Number",
      id: "phone_number",
      defaultVal: "",
      type: "number",
    },
    // {
    //   label: "Email",
    //   id: "email",
    //   defaultVal: email,
    // },
  ];

  return (
    <VStack gap='24px' maxW='560px'>
      {fields.map((item) => (
        <FormControl pos='relative' key={item.id} variant='floating'>
          <Input
            type={item.type || "text"}
            placeholder=' '
            defaultValue={item.defaultVal}
          />
          <FormLabel bgColor='red'>
            {item.defaultVal.trim().length !== 0
              ? item.label
              : `Add ${item.label}`}
          </FormLabel>
        </FormControl>
      ))}
    </VStack>
  );
}

export default AccountDetails;
