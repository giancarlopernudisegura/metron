import Prisma from '@lib/prisma'
import { Assignment } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

type Data = {
	assignments: Assignment[]
}

type Error = {
	error: string
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Error>
) {
	switch (req.method) {
	case 'GET':
		const assignments = await Prisma.client.assignment.findMany()
		res.status(200).json({ assignments })
		break
	case 'POST':
		const { name, description, courseName } = req.body
		const course = await Prisma.client.course.findFirst({ where: { name: { equals: courseName } } })
		if (!course) {
			res.status(400).json({ error: 'The course name does not exist.' })
			return
		}
		try {
			const newAssignment = await Prisma.client.assignment.create({ data: { name, description, courseId: course.id } })
			res.status(200).json({ assignments: [newAssignment] })
		} catch (err: any) {
			const error = { error: err.code.toString() }
			res.status(409).json(error)
		}
	default:
		res.status(405).end()
		break
	}
})
