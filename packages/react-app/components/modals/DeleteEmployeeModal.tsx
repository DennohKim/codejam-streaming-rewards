// Importing the dependencies
import { useState } from 'react';
// Import the toast library to display notifications
import { toast } from 'react-toastify';
// Import the erc20 contract abi to get the cUSD balance
import { TrashIcon } from '@heroicons/react/24/outline';
import { useContractDelete } from '@/hooks/contracts/useContractDelete';
import { waitForTransaction } from '@wagmi/core';


// Define the AddEmployeeModal component
interface Props {
  id: number;
}

const DeleteEmployeeModal = ({ id }: Props) => {
  // The visible state is used to toggle the visibility of the modal
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState('');

  // Use the useContractDelete hook to use our deleteEmployee function on the marketplace contract and add a Employee to the marketplace
  const { writeAsync: deleteEmployeeFunc } = useContractDelete(id);

  // Define function that handles the creation of a Employee through the marketplace contract
  const handleDeleteEmployee = async () => {
    if (!deleteEmployeeFunc) {
      throw 'Failed to delete Employee';
    }
    setLoading('Deleting...');
    // Delete the Employee by calling the deleteEmployee function on the marketplace contract
    const { hash: deleteHash }= await deleteEmployeeFunc();
    setLoading('Waiting for confirmation...');
    // Wait for the transaction to be mined
    await waitForTransaction({ confirmations: 1, hash: deleteHash });
    // Close the modal and clear the input fields after the Employee is added to the marketplace
    setVisible(false);
  };

  // Define function that handles the deleting of a Employee, if a user submits the Employee form
  const deleteEmployee = async (e: any) => {
    e.preventDefault();
    try {
      // Display a notification while the Employee is being added to the marketplace
      await toast.promise(handleDeleteEmployee(), {
        pending: 'Deleting Employee...',
        success: 'Employee deleted successfully',
        error: 'Something went wrong. Try again.',
      });
      // Delay for 2 seconds before reloading
      setTimeout(() => {
        window.location.reload();
      }, 4 ** 1000);
      // Display an error message if something goes wrong
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message);
    } finally {
      setLoading('');
    }
  };

  // Define the JSX that will be rendered
  return (
    <div>
      {/* Add Delete Button that opens the modal */}
      <button
        type='button'
        onClick={() => setVisible(true)}
        className='inline-block ml-4 p-1 bg-red-500 text-white rounded-[4px] font-medium text-md leading-tight shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
        data-bs-toggle='modal'
        data-bs-target='#exampleModalCenter'
      >
        <TrashIcon className='block h-4 w-4' aria-hidden='true' />
      </button>

      {/* Modal */}
      {visible && (
        <div
          className='fixed z-40 overflow-y-auto top-0 w-full left-0'
          id='modal'
        >
          {/* Form with input fields for the Employee, that triggers the deleteEmployee function on submit */}
          <form onSubmit={deleteEmployee}>
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
                {/* Input fields for the Employee */}
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <p>Are you sure you want to delete this Employee?</p>
                </div>
                {/* Button to close the modal */}
                <div className='bg-gray-200 px-4 py-3 text-right'>
                  <button
                    type='button'
                    className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'
                    onClick={() => setVisible(false)}
                  >
                    <i className='fas fa-times'></i> Cancel
                  </button>
                  {/* Button to add the Employee to the marketplace */}
                  <button
                    type='submit'
                    disabled={!!loading || !deleteEmployee}
                    className='py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2'
                  >
                    {loading ? loading : 'Delete'}
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

export default DeleteEmployeeModal;
