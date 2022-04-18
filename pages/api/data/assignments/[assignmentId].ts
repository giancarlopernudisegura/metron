import Prisma from '@library/prisma'
import { Assignment } from '.prisma/client/index'
import type { NextApiRequest, NextApiResponse } from 'next'

type Error = {
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Assignment | Error>
) {
	const { assignmentId } = req.query
	const assignment = await Prisma.client.assignment.findFirst({ where: { id: { equals: assignmentId.toString() } } })
	if (assignment)
		res.status(200).json(assignment)
	else
		res.status(404).json({ message: 'Assignment not found'})
}
