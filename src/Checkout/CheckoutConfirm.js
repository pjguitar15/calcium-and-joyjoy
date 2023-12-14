import { HStack, Input, Select, VStack, Text, Button } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";
import { useForm } from "react-hook-form";
import ChangeAddressModal from './ChangeAddressModal';

function CheckoutConfirm({ onConfirm }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [barangay, setBarangay] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [autoFilledData, setAutoFilledData] = useState({})
  const [allAddresses, setAllAddresses] = useState([])
  const [showModal, setShowModal] = useState(false)
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
    console.log(autoFilledData)
    if (autoFilledData) {
      setFirstName(autoFilledData?.first_name)
      setLastName(autoFilledData?.last_name)
      setBarangay(autoFilledData?.barangay)
      setStreetAddress(autoFilledData?.street_address)
      setPostalCode(autoFilledData?.postal_code)
      setCity(autoFilledData?.city_municipality)
      setEmail(autoFilledData?.email)
    }
  }, [autoFilledData])

  useEffect(() => {
    if (user) setUserInfo(user.user_info);

    axios.get(`http://18.223.157.202/backend/api/user/address`, {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    }).then((res) => {
      setAutoFilledData(res.data.data[0])
      setAllAddresses(res.data.data)
      // console.log(res.data.data)
    })
  }, []);

  const handleConfirm = (data) => {
    console.log(data)
    // onConfirm({ ...data, region });
  };

  const onCancel = () => {
    setShowModal(false);
  };

  // for modal
  const onModalConfirm = () => {
    setShowModal(false);
  };

  return (
    <VStack gap="16px" align="normal">
      {allAddresses.length > 1 && <button onClick={() => setShowModal(true)} className='text-blue-500'>Change Delivery Address</button>}
      {showModal && <ChangeAddressModal allAddresses={allAddresses} autoFilledData={autoFilledData} setAutoFilledData={setAutoFilledData} onModalConfirm={onModalConfirm} onCancel={onCancel} />}

      <Select
        as={RegionDropdown}
        value={autoFilledData ? autoFilledData?.region : region}
        onChange={(e) => setRegion(e)}
        showDefaultOption={false}
        country="Philippines"
        required
      />
      <HStack>
        <Input
          placeholder="First Name"
          {...register("first_name", { required: true })}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Input
          placeholder="Last Name"
          {...register("last_name", { required: true })}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </HStack>
      <Input placeholder="Barangay" {...register("barangay", { required: true })}
        value={barangay}
        onChange={(e) => setBarangay(e.target.value)}
      />
      <Input
        placeholder="Street/Building Name"
        {...register("street_bldg_name", { required: true })}
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
      />
      <HStack>
        <Input placeholder="Postal Code" {...register("postal_code", { required: true })}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <Input placeholder="City" {...register("city", { required: true })}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </HStack>
      <Text>Contact information:</Text>
      <Input placeholder="Email" {...register("email", { required: true })}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <Input
        placeholder="Phone Number"
        {...register("phone_number", { required: true })}
        defaultValue={autoFilledData?.phone_number !== undefined ? autoFilledData?.phone_number : ""}
      /> */}
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
