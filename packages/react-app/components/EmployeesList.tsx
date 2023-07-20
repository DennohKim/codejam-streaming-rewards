// This component is used to display all the Employeess in the marketplace

// Importing the dependencies
import { useState } from 'react';
// Import the Employees and Alert components
import Employees from '@/components/Employees';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import SuccessAlert from '@/components/alerts/SuccessAlert';
import { useContractCall } from '@/hooks/contracts/useContractRead';

// Define the EmployeesList component
const EmployeesList = () => {
  // Use the useContractCall hook to read how many Employeess are in the marketplace contract
  const { data } = useContractCall('getEmployeeCount', [], true);
  // Convert the data to a number
  const employeesLength = data ? Number(data.toString()) : 0;
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
  // Define a function to return the Employeess
  const getEmployees = () => {
    // If there are no Employeess, return null
    if (!employeesLength) return null;
    const employeesData = [];
    // Loop through the Employeess, return the Employees component and push it to the Employeess array
    for (let i = 0; i < employeesLength; i++) {
      employeesData.push(
        <Employees
          key={i}
          id={i}
          setSuccess={setSuccess}
          setError={setError}
          setLoading={setLoading}
          loading={loading}
          clear={clear}
        />
      );
    }
    return employeesData;
  };

  // Return the JSX for the component
  return (
    <div>
      {/* If there is an alert, display it */}
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
      {/* Display the Employeess */}
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Employees</h2>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
          {/* Loop through the Employees and return the Employees component */}
          {getEmployees()}
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
