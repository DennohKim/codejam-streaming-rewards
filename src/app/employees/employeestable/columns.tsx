'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { statuses } from './data/data';
import { truncateAddr } from '@/lib/utils';
import { EmployeesType } from './data/schema';
import { DataTableRowActions } from './data-table-row-actions';
import DataTableColumnHeader from './data-table-column-header';

const columns: ColumnDef<EmployeesType>[] = [
	{
		accessorKey: 'employee_name',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Employee Name" />,
		cell: ({ row }) => <div className="w-[80px]">{row.getValue('employee_name')}</div>,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'address',
		header: 'Address',
		cell: ({ row }) => {
			const userAddress = row.getValue('address') as string

			return <div>{truncateAddr(userAddress)}</div>
		},
	},
	{
		accessorKey: 'payment_method',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Method" />,
	},
	{
		accessorKey: 'employee_salary',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Employee Salary (cUSD)" />,
	},
	{
		accessorKey: 'date',
		header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
	},

	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]

export default columns;
