// Import the wagmi hooks to prepare and write to a smart contract
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
// Import the Marketplace ABI(Interface)
// Import BigNumber from ethers to handle big numbers used in Celo
import { BigNumber } from 'ethers';
import { employeeContract, employeeDetailsAbi } from '@/constants/constants';

// write to a smart contract
export const useContractDelete = (id: number) => {
  // The gas limit to use when sending a transaction
  const gasLimit = BigNumber.from(1000000);

  // Prepare the write to the smart contract
  const { config } = usePrepareContractWrite({
    // The address of the smart contract, in this case the Marketplace from the JSON file
    address: employeeContract,
    // The ABI of the smart contract, in this case the Marketplace from the JSON file
    abi: employeeDetailsAbi,
    // The smart contract function name to call
    functionName: 'deleteEmployeeDetails',
    // The arguments to pass to the smart contract function, id to delete
    args: [id],
    // The gas limit to use when sending a transaction
    // overrides: {
    //   gasLimit,
    // },
    onError: (err) => {
      console.log({ err });
    },
  });

  // Write to the smart contract using the prepared config
  const { data, isSuccess, write, writeAsync, error, isLoading } =
    useContractWrite(config);
  return { data, isSuccess, write, writeAsync, isLoading };
};
