import AddEmployeeModal from '@/components/modals/AddEmployeeModal';
import EmployeeTable from '@/components/employeestable/employee-table';

// Importing the dependencies
import { useState } from 'react';
// Import the Product and Alert components
import ErrorAlert from '@/components/alerts/ErrorAlert';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import SuccessAlert from '@/components/alerts/SuccessAlert';

// Alerts component
const Alerts = ({ error, success, loading, clear }: any) => {
  return (
    <div>
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
    </div>
  );
};
const EmployeesPage = () => {
  // Define the states to store the error, success and loading messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError('');
    setSuccess('');
    setLoading('');
  };
  // D
  return (
    <div>
      <Alerts error={error} success={success} loading={loading} clear={clear} />

      <AddEmployeeModal />
      <EmployeeTable />
    </div>
  );
};

export default EmployeesPage;
