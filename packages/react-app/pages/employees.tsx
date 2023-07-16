import AddEmployeeModal from "@/components/AddEmployeeModal";
import EmployeeTable from "@/components/employeestable/employee-table";


const EmployeesPage = () => {
  return (
    <div>
      <AddEmployeeModal />
      <EmployeeTable />
    </div>
  );
};

export default EmployeesPage;
