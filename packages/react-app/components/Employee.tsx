/* eslint-disable @next/next/no-img-element */
// This component displays and enables the purchase of a Employee

// Importing the dependencies
import { useCallback, useEffect, useState } from 'react';

// Import the useAccount hook to get the user's address
import { useAccount } from 'wagmi';

import { Button } from './ui/button';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import EditEmployeeModal from './modals/EditEmployeeModal';
import DeleteEmployeeModal from './modals/DeleteEmployeeModal';
import { ethers } from 'ethers';
import { convertBlockTimestampToDate, truncateAddr } from '@/lib/utils';
import { format } from 'date-fns';
import SendFundsModal from './modals/SendFundsModal';

// Define the interface for the Employee, an interface is a type that describes the properties of an object


// Define the Employee component which takes in the id of the Employee and some functions to display notifications
const Employee = ({
  id,
  employee,
  setError,
  setLoading,
  clear,
  editdelete = true,
}: any) => {
  // Use the useAccount hook to store the user's address
  const { address } = useAccount();
  // Use the useContractCall hook to read the data of the Employee with the id passed in, from the marketplace contract
//   const { data: rawEmployee }: any = useContractCall(
//     'getEmployeeDetails',
//     [id],
//     true
//   );
//   // Use the useContractSend hook to purchase the Employee with the id passed in, via the marketplace contract
//   const [employee, setEmployee] = useState<employeeType | null>(null);
//   console.log(employee)

//   // Format the Employee data that we read from the smart contract
//   const getFormatEmployee = useCallback(() => {
//     if (!rawEmployee) return null;

//     // hide Employee delete
//     if (rawEmployee[0] == '0x0000000000000000000000000000000000000000')
//       return null;

//     setEmployee({
//       owner: rawEmployee[1],
//       employee_name: rawEmployee[2],
//       address: rawEmployee[3],
//       payment_method: rawEmployee[4],
//       employee_salary: rawEmployee[5],
//       date: rawEmployee[6],
//     });
//   }, [rawEmployee]);

//   // Call the getFormatEmployee function when the rawEmployee state changes
//   useEffect(() => {
//     getFormatEmployee();
//   }, [getFormatEmployee]);

  // If the Employee cannot be loaded, return null
  if (!employee) return null;

  const salary = Number(employee.employee_salary.toString());
  
  const timestamp = Number(employee.date);



  // Return the JSX for the Employee component
  return (
    <div className=' '>
      <div className='flex flex-col space-y-3'>
        <div className='flex items-center justify-between rounded-lg px-6 py-4 hover:bg-primary hover:text-background'>
          <div className='text-md '>{employee.employee_name}</div>
          <div className='text-md '>{truncateAddr(employee.address)}</div>
          <div className='text-md'>{employee.payment_method}</div>
          <div className='text-md'>{salary}</div>
          <div className='text-md font-bold'>
            {convertBlockTimestampToDate(timestamp)}
          </div>
          {editdelete && address === employee.owner ? (
            <div className='flex flex-row'>
              <EditEmployeeModal id={id} employee={employee} />
              <DeleteEmployeeModal id={id} />
            </div>
          ) : (
            <div className='mt-1'>
              <br />
            </div>
          )}
          <div>
            <SendFundsModal id={id} employee={employee} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
