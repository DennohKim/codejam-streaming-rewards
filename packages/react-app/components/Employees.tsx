/* eslint-disable @next/next/no-img-element */
// This component displays and enables the purchase of a Employee

// Importing the dependencies
import { useCallback, useEffect, useState } from 'react';

// Import the useAccount hook to get the user's address
import { useAccount } from 'wagmi';
// Import the toast library to display notifications
import { toast } from 'react-toastify';

import { Button } from './ui/button';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import EditEmployeeModal from './modals/EditEmployeeModal';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal';

// Define the interface for the Employee, an interface is a type that describes the properties of an object
type employeeType = {
  owner: string;
  employee_name: string;
  address: string;
  payment_method: string;
  employee_salary: number;
  date: string;
}

// Define the Employee component which takes in the id of the Employee and some functions to display notifications
const Employee = ({
  id,
  setError,
  setLoading,
  clear,
  imgHeight = 'h-72',
  descHeight = 'h-40',
  editdelete = true,
}: any) => {
  // Use the useAccount hook to store the user's address
  const { address } = useAccount();
  // Use the useContractCall hook to read the data of the Employee with the id passed in, from the marketplace contract
  const { data: rawEmployee }: any = useContractCall(
    'readEmployee',
    [id],
    true
  );
  // Use the useContractSend hook to purchase the Employee with the id passed in, via the marketplace contract
  const [employee, setEmployee] = useState<employeeType | null>(null);

  // Format the Employee data that we read from the smart contract
  const getFormatEmployee = useCallback(() => {
    if (!rawEmployee) return null;

    // hide Employee delete
    if (rawEmployee[0] == '0x0000000000000000000000000000000000000000')
      return null;

    setEmployee({
      owner: rawEmployee[1],
      employee_name: rawEmployee[2],
      address: rawEmployee[3],
      payment_method: rawEmployee[4],
      employee_salary: rawEmployee[5],
      date: rawEmployee[6],
    });
  }, [rawEmployee]);

  // Call the getFormatEmployee function when the rawEmployee state changes
  useEffect(() => {
    getFormatEmployee();
  }, [getFormatEmployee]);

  // If the Employee cannot be loaded, return null
  if (!employee) return null;

  // Return the JSX for the Employee component
  return (
   

    <div className='mx-auto max-w-5xl '>
      <div className='flex flex-col space-y-3'>
        <div className='flex items-center justify-between rounded-lg px-3 py-2 text-xs'>
          <p className='text-[10px] md:text-[14px]'>Employee Name</p>
          <p className='text-[10px] md:text-[14px]'>Address</p>
          <p className='text-[10px] md:text-[14px]'>Payment Method</p>
          <p className='text-[10px] md:text-[14px]'>Employee Salary</p>
          <p className='text-[10px] md:text-[14px]'>Date</p>
        </div>

        <div className='flex items-center justify-between rounded-lg bg-tab px-6 py-4 hover:bg-primary hover:text-background'>
          <div className='text-md font-bold '>{employee.employee_name}</div>
          <div className='text-md font-bold '>{employee.address}</div>
          <div className='text-md font-bold'>{employee.payment_method}</div>
          <div className='text-md font-bold'>{employee.employee_salary}</div>
          <div className='text-md font-bold'>{employee.date}</div>
          {editdelete && address === employee.owner ? (
            <div className='flex flex-row'>
              <EditEmployeeModal id={id} employee={employee} />
              <DeleteEmployeeModal id={id} />
              <span className='ml-2'>* This is your Employee</span>
            </div>
          ) : (
            <div className='mt-1'>
              <br />
            </div>
          )}
          <div>
            <Button variant='outline'>Send funds</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
