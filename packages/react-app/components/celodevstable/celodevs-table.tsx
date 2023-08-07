import { useContractCall } from '@/hooks/contracts/useContractRead';
import columns from './columns';
import { DataTable } from './data-table';
import { celodevsType } from './data/schema';
import { useAppData } from '@/providers/AppDataProvider';
import { iCelodevsDetails } from '@/typings';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { celodevsContract, celodevsDetailsAbi } from '@/constants/constants';

interface employeeTableProps {
  id: number;
}

export default function EmployeeTable({ id }: employeeTableProps) {
 const { address } = useAccount();
 const {
   data: rawProduct,
   isError,
   isLoading,
 }: any = useContractRead({
   address: celodevsContract,
   abi: celodevsDetailsAbi,
   functionName: 'getCelodevDetails',
   args: [id, address],
   onError(error) {
     console.log('Error', error);
   },
 });

 console.log(rawProduct);

 const [celodevsDetails, setCelodevsDetails] =
   useState<iCelodevsDetails | null>();

 // Format the product data that we read from the smart contract
 const getFormatProduct = useCallback(() => {
   if (!rawProduct) return null;
   setCelodevsDetails({
     index: id,
     owner: rawProduct[0],
     name: rawProduct[1],
     walletAddress: rawProduct[2],
     paymentCurrency: rawProduct[3],
     taskDescription: rawProduct[4],
     rewardAmount: rawProduct[5],
     dateCaptured: rawProduct[6],
   });
 }, [rawProduct, id]);

 console.log(celodevsDetails);

 // Call the getFormatProduct function when the rawProduct state changes
 useEffect(() => {
   getFormatProduct();
 }, [getFormatProduct]);

 // If the devs cannot be loaded, return null
 if (!celodevsDetails) return null;


  return (
    <div className='container mx-auto py-6'>
      <DataTable columns={columns} data={celodevsDetails} />
    </div>
  );
}
