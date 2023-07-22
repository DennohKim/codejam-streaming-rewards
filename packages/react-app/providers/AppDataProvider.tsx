import { iEmployeeDetails } from '@/typings';
import { ethers } from 'ethers';
import {
  createContext,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import employeeAbi from '@/abi/EmployeeDetails.json';
import { employeeContract, employeeDetailsAbi } from '@/constants/constants';

declare global {
  interface Window {
    ethereum?: any; // Change the type to 'any'
  }
}

type AppDataProviderProps = {
  children: React.ReactNode;
};

type AppDataContextType = {
  getEmployees: () => Promise<iEmployeeDetails[]>;
  employeesDetails: iEmployeeDetails[];
};

export const AppDataContext = createContext({} as AppDataContextType);

export function useAppData() {
  return useContext(AppDataContext);
}

export default function AppDataProvider({ children }: AppDataProviderProps) {
  const [employeesDetails, setEmployeesDetails] = useState<iEmployeeDetails[]>(
    []
  );

  const getEmployees = useCallback(async function (): Promise<
    iEmployeeDetails[]
  > {
    if (!window.ethereum) {
      // Handle the case where window.ethereum is not available
      console.error('Ethereum wallet extension not detected.');
      return [];
    }
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        employeeContract,
        employeeDetailsAbi,
        signer
      );
      const getNumberOfEmployees = await contract.getNumberOfEmployees();
      const employeesLength =
        ethers.BigNumber.from(getNumberOfEmployees).toNumber();
      console.log(employeesLength);
      const _employeesData = [];

      for (let i = 0; i < employeesLength; i++) {
        let _employeeData = new Promise<iEmployeeDetails>(
          async (resolve, reject) => {
            let p = await contract.getEmployeeDetails(i);
            resolve({
              index: i,
              owner: p[0],
              employee_name: p[1],
              address: p[2],
              payment_method: p[3],
              employee_salary: p[4],
              date: p[5],
            });
          }
        );
        _employeesData.push(_employeeData);
      }
      const employeeData = await Promise.all(_employeesData);
      return employeeData;
    } catch (error) {
      // Handle errors if any
      console.error('Error fetching employee details:', error);
      return [];
    }
  },
  []);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployeesDetails(data);
      console.log(data);
    });
  }, [getEmployees]);

  return (
    <AppDataContext.Provider
      value={{
        getEmployees,
        employeesDetails,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}
