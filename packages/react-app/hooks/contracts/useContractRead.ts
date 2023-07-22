import employeeAbi from '@/abi/EmployeeDetails.json';

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
    address: '0xcD5a572dBe43785B6369E320009bB2B847c4b5ae',
    // The ABI of the smart contract, in this case the Marketplace from the JSON file
    abi: employeeAbi,
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
  });

  return resp;
};
