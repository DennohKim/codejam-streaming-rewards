import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';
import { useContractSend } from '@/hooks/contracts/useContractWrite';
import { waitForTransaction } from '@wagmi/core';
import { useRouter } from 'next/navigation';

const AddEmployeeModal = () => {

	const router = useRouter()
  const [visible, setVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeSalary, setEmployeeSalary] = useState<string | Number>(0);
  const [employeeWalletAddress, setEmployeeWalletAddress] = useState('');
  const [employeePaymentMethod, setEmployeePaymentMethod] = useState('');
  const [debouncedEmployeeName] = useDebounce(employeeName, 500);
  const [debouncedEmployeeSalary] = useDebounce(employeeSalary, 500);
  const [debouncedEmployeeWalletAddress] = useDebounce(
    employeeWalletAddress,
    500
  );
  const [debouncedEmployeePaymentMethod] = useDebounce(
    employeePaymentMethod,
    500
  );
  const [loading, setLoading] = useState('');

  const isComplete =
    employeeName &&
    employeeSalary &&
    employeeWalletAddress &&
    employeePaymentMethod;

  const clearForm = () => {
    setEmployeeName('');
    setEmployeeSalary(0);
    setEmployeeWalletAddress('');
    setEmployeePaymentMethod('');
  };

  const EmployeeSalaryInWei = ethers.utils.parseEther(
    `${debouncedEmployeeSalary.toString() || 0}`
  );

  const { writeAsync: createEmployee } = useContractSend(
    'captureEmployeeDetails',
    [
      debouncedEmployeeName,
      debouncedEmployeeWalletAddress,
      debouncedEmployeePaymentMethod,
      EmployeeSalaryInWei,
    ]
  );

  const handleCreateEmployee = async () => {
    if (!createEmployee) {
      throw 'Failed to create Employee';
    }
    setLoading('Creating...');
    if (!isComplete) throw new Error('Please fill all fields');
    const { hash: approveHash } = await createEmployee();
    setLoading('Waiting for confirmation...');

    await waitForTransaction({ confirmations: 1, hash: approveHash });

    setVisible(false);
    clearForm();
  };

  const addEmployee = async (e: any) => {
    e.preventDefault();
    try {
      await toast.promise(handleCreateEmployee(), {
        loading: 'Creating Employee...',
        success: 'Employee created successfully',
        error: 'Something went wrong. Try again.',

      });
	    setTimeout(() => {
        router.refresh()
      }, 7000);


    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message || 'Something went wrong. Try again.');

    } finally {
      setLoading('');

    }
  };

  return (
    <div className={'flex flex-row w-full justify-between'}>
      <div>
        <button
          type='button'
          onClick={() => setVisible(true)}
          className='inline-block ml-4 px-6 py-2.5 border-2 border-primary text-neutral-700 font-medium text-md leading-tight rounded-lg shadow-md hover:bg-primary hover:text-white hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out'
          data-bs-toggle='modal'
          data-bs-target='#exampleModalCenter'
        >
          Add Employee
        </button>

        {/* Modal */}
        {visible && (
          <div
            className='fixed z-40 overflow-y-auto top-0 w-full left-0'
            id='modal'
          >
            <form onSubmit={addEmployee}>
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
                      <label>Employee Name</label>
                      <input
                        onChange={(e) => {
                          setEmployeeName(e.target.value);
                        }}
                        required
                        type='text'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                    <div>
                      <label>Employee Wallet Address</label>
                      <input
                        onChange={(e) => {
                          setEmployeeWalletAddress(e.target.value);
                        }}
                        required
                        type='text'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <label>Employee Payment Method</label>
                      <select
                        value={employeePaymentMethod}
                        onChange={(e) => {
                          setEmployeePaymentMethod(e.target.value);
                        }}
                        className='py-2.5'
                      >
                        <option defaultValue='Select token'>
                          Select token
                        </option>
                        <option value='cusd'>cUSD</option>
                        <option value='celo'>Celo</option>
                      </select>
                    </div>

                    <div>
                      <label>Employee Salary (cUSD)</label>
                      <input
                        onChange={(e) => {
                          setEmployeeSalary(e.target.value);
                        }}
                        required
                        type='number'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                  </div>
                  <div className='bg-gray-200 px-4 py-3 text-right'>
                    <button
                      type='button'
                      className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'
                      onClick={() => setVisible(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={!!loading || !isComplete || !createEmployee}
                      className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2'
                    >
                      {loading ? loading : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEmployeeModal;
