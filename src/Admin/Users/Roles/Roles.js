import ActionButtons from "./ActionButtons"
import Table from "./Table"
 
function Roles() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">
        User Management | Permissions
      </h2>
      <div className="px-7">
        <ActionButtons />
        <Table />
      </div>
    </div>
  )
}

export default Roles
