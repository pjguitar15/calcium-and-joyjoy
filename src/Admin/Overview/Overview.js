import { Grid, Heading } from "@chakra-ui/react"
import LineChart from "./LineChart"
import BarChart from "./BarChart"
import UserBehavior from "./UserBehaviorChart"

function Overview() {
  return (
    <div>
      {/* Dashboard Heading */}
      <Heading as="h1" fontSize="36px" fontWeight="bold" mb="24px">
        Dashboard Overview
      </Heading> 

      {/* Charts and Analysis Section */}
      <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr" }} gap="24px">
        <LineChart />
        <BarChart />
        <UserBehavior />
      </Grid>
    </div>
  )
}

export default Overview
