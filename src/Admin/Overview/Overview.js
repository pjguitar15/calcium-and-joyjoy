import { Grid, Heading } from "@chakra-ui/react"
import { RiCoinsFill } from "react-icons/ri"
import { MdInventory } from "react-icons/md"
import { PiWarningCircleBold } from "react-icons/pi"
import { useState } from "react"
import LineChart from "./LineChart"
import BarChart from "./BarChart"

function Overview() {
  const [selectedOption, setSelectedOption] = useState("daily")

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }
  const dashboardWidgets = [
    {
      icon: <RiCoinsFill className="text-5xl text-white" />,
      iconBgColor: "bg-green-500",
      textDesc: "Sales",
      textVal: "55%",
    },
    {
      icon: <MdInventory className="text-5xl text-white" />,
      iconBgColor: "bg-yellow-500",
      textDesc: "Inventory",
      textVal: "55 items",
    },
    {
      icon: <PiWarningCircleBold className="text-5xl text-white" />,
      iconBgColor: "bg-red-500",
      textDesc: "Alerts & Notifications",
      textVal: "15",
    },
  ]

  return (
    <div>
      <Heading fontSize="28px" fontWeight="semibold">
        Dashboard
      </Heading>

      {/* <div className="flex gap-4 mt-6">
        <label className="flex items-center">
          <input
            type="radio"
            value="daily"
            checked={selectedOption === "daily"}
            onChange={handleOptionChange}
            className="text-black"
          />
          <span className="ml-1">Daily</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            value="weekly"
            checked={selectedOption === "weekly"}
            onChange={handleOptionChange}
            className="text-black"
          />
          <span className="ml-1">Weekly</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            value="monthly"
            checked={selectedOption === "monthly"}
            onChange={handleOptionChange}
            className=" text-black"
          />
          <span className="ml-1">Monthly</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            value="annually"
            checked={selectedOption === "annually"}
            onChange={handleOptionChange}
            className=" text-black"
          />
          <span className="ml-1">Annually</span>
        </label>
      </div> */}

      <div className="flex gap-6 mt-4">
        {dashboardWidgets.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md p-1 border border-gray-400 min-w-[300px] divide-y divide-gray-300 flex flex-col gap-5"
          >
            <div className="flex justify-between px-5 py-4">
              <div className={`${item.iconBgColor} rounded-md p-4`}>
                {item.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-gray-600 text-md">{item.textDesc}</span>
                <h5 className="text-2xl font-semibold">{item.textVal}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Grid mt="64px" gridTemplateColumns="1fr 1fr" gap="24px">
        <LineChart />
        <BarChart />
      </Grid>
    </div>
  )
}

export default Overview
