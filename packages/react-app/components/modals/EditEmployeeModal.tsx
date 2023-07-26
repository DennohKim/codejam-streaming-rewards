import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

import { PencilIcon } from '@heroicons/react/24/outline';

import { waitForTransaction } from '@wagmi/core';

import { useContractSend } from '@/hooks/contracts/useContractWrite';
import { useRouter } from 'next/navigation';

interface employeeProps {
  id: number;
  employee: {
    owner: string;
    employee_name: string;
    address: string;
    payment_method: string;
    employee_salary: number;
    date: string;
  };
}

const EditEmployeeModal = ({ id, employee }: employeeProps) => {

	const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState(employee.employee_name);
  const [employeeWalletAddress, setEmployeeWalletAddress] = useState<string>(
    employee.address
  );
  const [employeePaymentMethod, setEmployeePaymentMethod] = useState(
    employee.payment_method
  );
  const [employeeSalary, setEmployeeSalary] = useState<any>(
    employee.employee_salary
  );

  const [debouncedEmployeeName] = useDebounce(employeeName, 500);
  const [debouncedAddress] = useDebounce(employeeWalletAddress, 500);
  const [debouncedPaymentMethod] = useDebounce(employeePaymentMethod, 500);
  const [debouncedEmployeeSalary] = useDebounce(employeeSalary, 500);
  const [loading, setLoading] = useState('');

  const isComplete = () => {
    if (employeeName.trim() == '' || employeeName.length < 2) {
      toast.warn(
        'Please enter valid Employee name (2 characters or more & not only whitespace'
      );
      return false;
    }
    if (
      employeeWalletAddress.trim() == '' ||
      employeeWalletAddress.length < 2
    ) {
      toast.warn('Please enter a valid wallet address');
      return false;
    }
    if (
      employeePaymentMethod.trim() == '' ||
      employeePaymentMethod.length < 2
    ) {
      toast.warn('Please select a valid payment method');
      return false;
    }
    if (Number(employeeSalary) < 1) {
      toast.warn('Please enter a valid salary amount (> 0)');
      return false;
    }

    return true;
  };

  const { writeAsync: editEmployeeFunc } = useContractSend(
    'updateEmployeeDetails',
    [
      id,
      debouncedEmployeeName,
      debouncedAddress,
      debouncedPaymentMethod,
      debouncedEmployeeSalary,
    ]
  );

  const handleEditEmployee = async () => {
    if (!editEmployeeFunc) {
      throw 'Failed to edit Employee';
    }
    setLoading('Editing...');
    if (!isComplete()) throw new Error('Please fill all fields');
    const { hash: editHash } = await editEmployeeFunc();
    setLoading('Waiting for confirmation...');
    await waitForTransaction({ confirmations: 1, hash: editHash });
    setVisible(false);
  };

  const editEmployee = async (e: any) => {
    e.preventDefault();
    try {
      await toast.promise(handleEditEmployee(), {
        pending: 'Editing Employee...',
        success: 'Employee edited successfully',
        error: 'Something went wrong. Try again.',
      });
	   setTimeout(() => {
       router.refresh();
     }, 7000);

    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message);
    } finally {
      setLoading('');
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={() => setVisible(true)}
        className='inline-block p-1 bg-white text-black font-medium text-md leading-tight rounded-[4px] shadow-md border border-black'
        Employee-bs-toggle='modal'
        Employee-bs-target='#exampleModalCenter'
      >
        <PencilIcon className='block h-4 w-4' aria-hidden='true' />
      </button>

      {/* Modal */}
      {visible && (
        <div
          className='fixed z-40 overflow-y-auto top-0 w-full left-0'
          id='modal'
        >
          <form onSubmit={editEmployee}>
            <div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div className='fixed inset-0 transition-opacity'>
                <div className='absolute inset-0 bg-gray-900 opacity-75' />
              </div>
              <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                &#8203;
              </span>
              <div
                className='inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-headline'
              >
                <div className='bg-white flex flex-col space-y-3 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div>
                    <label className='text-black'>Employee Name</label>
                    <input
                      onChange={(e) => {
                        setEmployeeName(e.target.value);
                      }}
                      value={employeeName}
                      required
                      type='text'
                      className='w-full bg-gray-200 p-2 mt-2 mb-3'
                    />
                  </div>
                  <div>
                    <label className='text-black'>
                      Employee Wallet Address
                    </label>
                    <input
                      onChange={(e) => {
                        setEmployeeWalletAddress(e.target.value);
                      }}
                      value={employeeWalletAddress}
                      required
                      type='text'
                      className='w-full bg-gray-200 p-2 mt-2 mb-3'
                    />
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <label className='text-black'>
                      Employee Payment Method
                    </label>
                    <select
                      value={employeePaymentMethod}
                      onChange={(e) => {
                        setEmployeePaymentMethod(e.target.value);
                      }}
                      className='py-2.5'
                    >
                      <option defaultValue='Select token'>Select token</option>
                      <option value='cusd'>cUSD</option>
                      <option value='celo'>Celo</option>
                    </select>
                  </div>

                  <div>
                    <label className='text-black'>Employee Salary (cUSD)</label>
                    <input
                      onChange={(e) => {
                        setEmployeeSalary(e.target.value);
                      }}
                      value={employeeSalary}
                      required
                      type='number'
                      className='w-full bg-gray-200 p-2 mt-2 mb-3'
                    />
                  </div>
                </div>
                <div className='bg-gray-200 px-4 py-3 text-right'>
                  <button
                    type='button'
                    className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'
                    onClick={() => setVisible(false)}
                  >
                    <i className='fas fa-times'></i> Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={!!loading || !isComplete || !editEmployee}
                    className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2'
                  >
                    {loading ? loading : 'Edit'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditEmployeeModal;
