import { useContractCall } from '@/hooks/contracts/useContractRead'
import columns from './columns'
import { DataTable } from './data-table'
import { EmployeesType } from './data/schema'

const  employeeData: EmployeesType[] = [
		{
			id: 1,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,
			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 1,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 2,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 3,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 4,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 5,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 6,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 7,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 8,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 9,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 10,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 11,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',

			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 12,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
		{
			id: 13,
			employee_name: 'Chizaa',
			address: '0xce7Ff9D05dD37DD1C86364670c18d92561549954',
			payment_method: 'cUSD',
			employee_salary: 3,

			date: '20 Jan 2022, 09.00 PM',
		},
	]




export default function EmployeeTable() {

	//   const { data }: any = useContractCall('readProduct', [id], true)


	return (
		<div className="container mx-auto py-6">
			<DataTable columns={columns} data={employeeData} />
		</div>
	)
}
