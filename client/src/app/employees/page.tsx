import prisma from '@/db/prisma'
import Session from '@/lib/session'
import { cookies } from 'next/headers'
import EmployeeTable from './employeestable/employee-table'
import BlockPlaceholder from '@/components/BlockPlaceholder'
import AddEmployeeModal from './createemployee/AddEmployeeModal'

const EmployeesPage = async () => {
	const session = await Session.fromCookies(cookies())

	return (
		<div>
			<AddEmployeeModal />
			{/* @ts-expect-error Server Component */}

			<EmployeeTable />
		</div>
	)
}

export default EmployeesPage
