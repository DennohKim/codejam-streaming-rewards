
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContractCall } from '@/hooks/contracts/useContractRead';
import { useContractRead } from 'wagmi';
import employeeAbi from '@/abi/EmployeeDetails.json';
import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { employeeContract, employeeDetailsAbi } from '@/constants/constants';



const Home = () => {
  //const { data } = useContractCall('getNumberOfEmployees', [], true);

    //  const { data, isError, isLoading } = useContractRead({
    //    address: '0xcD5a572dBe43785B6369E320009bB2B847c4b5ae',
    //    abi: employeeAbi,
    //    functionName: 'getNumberOfEmployees',
    //  });

    // // Convert the data to a number
    // const employeeLength = data ? Number(data.toString()) : 0;

	// console.log(employeeLength)

  const [ numberOfEmployees, setNumberOfEmployees]= useState(0);
  async function getItemLength() {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        employeeContract,
        employeeDetailsAbi,
        signer
      );

      const getNumberOfEmployees = await contract.getNumberOfEmployees();
      return getNumberOfEmployees;
    } catch (err) {
      console.error(err);
    }
  }

  //get my products
  useEffect(() => {
    getItemLength().then((data) => {
      setNumberOfEmployees(data);
      console.log(data);
    });
  }, []);

  const employeeLength = ethers.BigNumber.from(numberOfEmployees).toString();
  console.log(employeeLength);

  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Employees</CardTitle>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='h-4 w-4 text-muted-foreground'
          >
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </CardHeader>
        <CardContent>
          {/* {isLoading ? (
              <p className='text-2xl font-bold'>Loading...</p>
            ) : (
              <div className='text-2xl font-bold'>{employeeLength}</div>
            )} */}
          <p>{employeeLength}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;