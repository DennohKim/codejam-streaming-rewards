import { employeeContract, employeeDetailsAbi } from '@/constants/constants';
// Import the wagmi hook to read from a smart contract
import { useContractRead } from 'wagmi';
// Import the Marketplace ABI(Interface)

// read from smart contract
export const useContractCall = (
  functionName: string,
  args?: Array<any>,
  watch?: boolean,
  from?: `0x${string}` | undefined
) => {
  const resp = useContractRead({
    // The address of the smart contract, in this case the Marketplace from the JSON file
    address: employeeContract,
    // The ABI of the smart contract, in this case the Marketplace from the JSON file
    abi: employeeDetailsAbi,
    // The smart contract function name to call
    functionName: functionName,
    // The arguments to pass to the smart contract function
    args,
    // A boolean to watch for changes in the smart contract. If true, the hook will re-run when the smart contract changes
    watch,
    // The address of the user to call the smart contract function from which is optional
    //overrides: from ? { from } : undefined,
    onError: (err) => {
      console.log({ err });
    },
    onSuccess(data) {
      console.log('Success', data);
    },
  });

  return resp;
};
