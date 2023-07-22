// This component is used to display all the Employeess in the marketplace

// Importing the dependencies
import { useEffect, useState } from 'react';
// Import the Employees and Alert components
import Employee from '@/components/Employee';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import SuccessAlert from '@/components/alerts/SuccessAlert';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import { ethers } from 'ethers';
import employeeAbi from '@/abi/EmployeeDetails.json';
import { employeeContract, employeeDetailsAbi } from '@/constants/constants';

// Define the EmployeesList component
const EmployeesList = () => {
  // Use the useContractCall hook to read how many Employeess are in the marketplace contract
  //   const { data } = useContractCall('getNumberOfEmployees', [], true);
  // Convert the data to a number
  //const employeesLength = data ? Number(data.toString()) : 0;
  // Define the states to store the error, success and loading messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');
  const [employeesDetails, setEmployeesDetails] = useState([]);

  let employeeData = [];

  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError('');
    setSuccess('');
    setLoading('');
  };

 

  const getEmployees = async function () {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      employeeContract,
      employeeDetailsAbi,
      signer
    );
    const getNumberOfEmployees = await contract.getNumberOfEmployees();
    const employeesLength =
      ethers.BigNumber.from(getNumberOfEmployees).toNumber();
    console.log(employeesLength);
    const _employeesData = [];

    for (let i = 0; i < employeesLength; i++) {
      let _employeeData = new Promise(async (resolve, reject) => {
        let p = await contract.getEmployeeDetails(i);
        resolve({
          index: i,
          owner: p[0],
          employee_name: p[1],
          address: p[2],
          payment_method: p[3],
          employee_salary: p[4],
          date: p[5],
        });
      });
      _employeesData.push(_employeeData);
    }
    employeeData = await Promise.all(_employeesData);
    return employeeData;
  };

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployeesDetails(data as any);
      console.log(data);
    });
  }, []);

  // Return the JSX for the component
  return (
    <div>
      {/* If there is an alert, display it */}
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
      {/* Display the Employeess */}
      <div className='mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>Employees</h2>
        <div className='grid grid-cols-1'>
          <div className='flex items-center justify-between rounded-lg px-3 py-2 text-xs'>
            <p className='text-[10px] md:text-[14px]'>Employee Name</p>
            <p className='text-[10px] md:text-[14px]'>Address</p>
            <p className='text-[10px] md:text-[14px]'>Payment Method</p>
            <p className='text-[10px] md:text-[14px]'>Employee Salary</p>
            <p className='text-[10px] md:text-[14px]'>Time Created</p>
            <p className='text-[10px] md:text-[14px]'>Change</p>
            <p className='text-[10px] md:text-[14px]'>Send Funds</p>
          </div>
          {/* Loop through the Employees and return the Employees component */}
          {employeesDetails.map((employee: any) => (
            <Employee
              key={employee.index}
              id={employee.index}
              employee={employee}
              setError={setError}
              setLoading={setLoading}
              clear={clear}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
