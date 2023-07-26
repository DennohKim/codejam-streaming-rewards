import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { employeeContract, employeeDetailsAbi } from '@/constants/constants';

// write to a smart contract
export const useContractDelete = (id: number) => {
  const gasLimit = BigNumber.from(1000000);

  const { config } = usePrepareContractWrite({
    address: employeeContract,
    abi: employeeDetailsAbi,
    functionName: 'deleteEmployeeDetails',
    args: [id],
    // overrides: {
    //   gasLimit,
    // },
    onError: (err) => {
      console.log({ err });
    },
  });

  const { data, isSuccess, write, writeAsync, error, isLoading } =
    useContractWrite(config);
  return { data, isSuccess, write, writeAsync, isLoading };
};
