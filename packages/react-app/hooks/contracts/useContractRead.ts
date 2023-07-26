import employeeAbi from '@/abi/EmployeeDetails.json';
import { useContractRead } from 'wagmi';

export const useContractCall = (
  functionName: string,
  args?: Array<any>,
  watch?: boolean,
  from?: `0x${string}` | undefined
) => {
  const resp = useContractRead({
    address: '0xcD5a572dBe43785B6369E320009bB2B847c4b5ae',
    abi: employeeAbi.abi,
    functionName: functionName,
    args,
    watch,
    //overrides: from ? { from } : undefined,
    onError: (err) => {
      console.log({ err });
    },
  });

  return resp;
};
