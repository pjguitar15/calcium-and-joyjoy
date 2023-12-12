import { FormControl, FormLabel, Input, Grid, Heading, Text, Button, Tooltip, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Shared/utils/axiosInstance";
import useRefetchUser from "../Shared/Hooks/useRefetchUser";

function AccountDetails() {
  const navigate = useNavigate();
  const toast = useToast();
  const { refetch } = useRefetchUser();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return navigate("/");

  const { firstname, lastname, email } = user.user_info;

  const fields = [
    {
      label: "First Name",
      id: "firstname",
      defaultVal: firstname,
      gridColumn: "1"
    },
    {
      label: "Last Name",
      id: "lastname",
      defaultVal: lastname,
      gridColumn: "2"
    },
    {
      label: "Email",
      id: "email",
      defaultVal: email,
      gridColumn: "1 / -1" // span across all columns
    },
    {
      label: "Password",
      id: "password",
      defaultVal: "password",
      type: "password",
      gridColumn: "1 / -1"
    },
    {
      label: "Phone Number",
      id: "phone_number",
      defaultVal: "",
      type: "tel",
      tooltip: "Include country code if applicable",
      gridColumn: "1 / -1"
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await axiosInstance.post('/update-user', formData);
      toast({
        title: "Account updated.",
        description: "Your account details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating account.",
        description: "There was an issue updating your account details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} maxW="800px" as="form" onSubmit={handleSubmit} mx="auto">
      <Heading size='lg' gridColumn="1 / -1">Account Details</Heading>
      <Text gridColumn="1 / -1">Update your personal information and contact details.</Text>

      {fields.map((item) => (
        <FormControl key={item.id} gridColumn={item.gridColumn}>
          <FormLabel htmlFor={item.id}>{item.label}</FormLabel>
          <Tooltip label={item.tooltip || ""} shouldWrapChildren mt='3'>
            <Input
              id={item.id}
              name={item.id}
              type={item.type || "text"}
              placeholder={item.label}
              defaultValue={item.defaultVal}
              size="md"
            />
          </Tooltip>
        </FormControl>
      ))}

      <Button type="submit" colorScheme='blue' gridColumn="1 / -1" size="lg">
        Update Details
      </Button>
    </Grid>
  );
}

export default AccountDetails;
