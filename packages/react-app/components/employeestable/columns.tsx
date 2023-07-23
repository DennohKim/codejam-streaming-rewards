'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { statuses } from './data/data';
import { convertBlockTimestampToDate, truncateAddr } from '@/lib/utils';
import { EmployeesType } from './data/schema';
import { DataTableRowActions } from './data-table-row-actions';
import DataTableColumnHeader from './data-table-column-header';
import EditEmployeeModal from '../modals/EditEmployeeModal';
import DeleteEmployeeModal from '../modals/DeleteEmployeeModal';
import SendFundsModal from '../modals/SendFundsModal';
import { ethers } from 'ethers';

const columns: ColumnDef<EmployeesType>[] = [
  {
    accessorKey: 'employee_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee Name' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('employee_name')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const userAddress = row.getValue('address') as string;

      return <div>{truncateAddr(userAddress)}</div>;
    },
  },
  {
    accessorKey: 'payment_method',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payment Method' />
    ),
  },
  {
    accessorKey: 'employee_salary',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employee Salary (cUSD)' />
    ),
    cell: ({ row }) => {
      const salary = row.getValue('employee_salary') as number;
	  const salaryInCUSD = ethers.utils.formatUnits(salary, 18);

      return <div>{salaryInCUSD.toString()} cUSD</div>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const convertedDate = row.getValue('date') as number;

      return <div>{convertBlockTimestampToDate(convertedDate)}</div>;
    },
  },

  {
    accessorKey: 'index',
    header: 'Actions',

    cell: ({ row }) => {
      const id = row.getValue('index') as number;
      const employee = row.original;

      return (
        <div>
          <div className='flex flex-row'>
            <EditEmployeeModal id={id} employee={employee} />
            <DeleteEmployeeModal id={id} />
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'index',
    header: 'Send Funds',
    cell: ({ row }) => {
      const id = row.getValue('index') as number;
      const employee = row.original;
	  console.log('employee', employee);

      return (
        <div>
          <div className='flex flex-row'>
            <SendFundsModal id={id} employee={employee} />
          </div>
        </div>
      );
    },
  },
];

export default columns;
