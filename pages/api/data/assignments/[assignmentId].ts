import Prisma from '@lib/prisma'
import { Assignment } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

type Error = {
	message: string
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Assignment | Error>
) {
	const { assignmentId } = req.query
	const assignment = await Prisma.client.assignment.findFirst({ where: { id: { equals: assignmentId.toString() } } })
	if (assignment) {
		res.status(200).json(assignment)
	} else {
		res.status(404).json({ message: 'Assignment not found.' })
	}
})
