// Importing the dependencies
import { useState } from 'react';
// import ethers to convert the Employee price to wei
import { ethers } from 'ethers';
// Import the toast library to display notifications
import { toast } from 'react-hot-toast';
// Import the useDebounce hook to debounce the input fields

import { Button } from '../ui/button';
import { Framework } from '@superfluid-finance/sdk-core';

// Define the AddEmployeeModal component
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

declare global {
  interface Window {
    ethereum?: any;
  }
}

const SendFundsModal = ({ id, employee }: employeeProps) => {
  // The visible state is used to toggle the visibility of the modal
  const [visible, setVisible] = useState(false);
  // The following states are used to store the values of the input fields

  const [flowRateDisplay, setFlowRateDisplay] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [recipient, setRecipient] = useState(employee.address);

  async function createNewFlow(recipient: string, flowRate: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });
    const superSigner = sf.createSigner({ signer: signer });
    const cusdx = await sf.loadSuperToken('CUSDx');

    console.log(cusdx);

    try {
      const createFlowOperation = cusdx.createFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate: flowRate,
      });

      console.log(createFlowOperation);
      toast('Creating your stream...');

      const result = await createFlowOperation.exec(superSigner);
      console.log(result);

      toast.success(
        `Congrats - you've just created a money stream!
    `
      );
    } catch (error) {
      console.log('Error: ', error);
      toast.error(`Error: ${error}`);
    }
  }

  const handleFlowRateChange = (e: any) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    if (newFlowRateDisplay) {
      setFlowRateDisplay(newFlowRateDisplay.toString());
    }
  };

  function calculateFlowRate(amount: any) {
    if (Number(amount) === 0) {
      return 0;
    }
    const amountInWei = ethers.BigNumber.from(amount);
    const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
    // @ts-ignore
    const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
    return calculatedFlowRate;
  }

  // Define the JSX that will be rendered
  return (
    <div>
      {/* Add Employee Button that opens the modal */}
      <button
        type='button'
        onClick={() => setVisible(true)}
        className='inline-block text-black font-medium text-md leading-tight rounded-[4px] shadow-md'
        Employee-bs-toggle='modal'
        Employee-bs-target='#exampleModalCenter'
      >
        <Button>Send funds</Button>
      </button>

      {/* Modal */}
      {visible && (
        <div
          className='fixed z-40 overflow-y-auto top-0 w-full left-0'
          id='modal'
        >
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
              <div>
                <div className='flex flex-col items-start p-4'>
                  <input
                    value={recipient}
                    className='text-black py-1 px-2 mb-2 w-72'
                  />
                  <input
                    value={flowRate}
                    onChange={handleFlowRateChange}
                    placeholder='Enter a flowRate in wei/second'
                    className='text-black py-1  px-2 w-72'
                  />
                  <Button
                    className='px-8 py-2 rounded-3xl bg-white text-black mt-2'
                    onClick={() => {
                      createNewFlow(recipient, flowRate);
                    }}
                    variant='secondary'
                  >
                    Click to Create Your Stream
                  </Button>
                  <a
                    className='mt-4 text-green-400'
                    href='https://app.superfluid.finance/'
                    target='_blank'
                    rel='no-opener'
                  >
                    View Superfluid Dashboard
                  </a>
                </div>
                <div className='border-green-400 border p-4 mt-3'>
                  <p>Your flow will be equal to:</p>
                  <p>
                    <b>${flowRateDisplay !== ' ' ? flowRateDisplay : 0}</b>{' '}
                    cusdx/month
                  </p>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendFundsModal;
