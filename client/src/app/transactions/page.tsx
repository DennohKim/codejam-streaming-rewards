import prisma from '@/db/prisma'
import Session from '@/lib/session'
import { cookies } from 'next/headers'
import BlockPlaceholder from '@/components/BlockPlaceholder'

const TransactionsPage = async () => {
	const session = await Session.fromCookies(cookies())

	return <BlockPlaceholder />
}

export default TransactionsPage
