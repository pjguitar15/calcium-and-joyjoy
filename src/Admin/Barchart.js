import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const dummy = [
  { day: "Monday", sales: 20 },
  { day: "Tuesday", sales: 35 },
  { day: "Wednesday", sales: 10 },
  { day: "Thursday", sales: 20 },
];

function Barchart() {
  return (
    <Box>
      <Bar
        data={{
          labels: dummy.map((x) => x.day),
          datasets: [
            {
              label: "Sales",
              data: dummy.map((x) => x.sales),
            },
          ],
        }}
      />
    </Box>
  );
}

export default Barchart;
