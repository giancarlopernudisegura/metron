import Prisma from '@library/prisma'
import { Assignment } from '.prisma/client/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

type Data = {
	assignments: Assignment[]
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const _assignments = await Prisma.client.assignment.findMany()
	res.status(200).json({ assignments: _assignments })
})
