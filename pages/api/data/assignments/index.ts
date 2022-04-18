import Prisma from '@library/prisma'
import { Assignment } from '.prisma/client/index'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	assignments: Assignment[]
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const _assignments = await Prisma.client.assignment.findMany()
	res.status(200).json({ assignments: _assignments })
}
