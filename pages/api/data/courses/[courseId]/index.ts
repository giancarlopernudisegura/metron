import Prisma from '@library/prisma'
import { Course } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

type Error = {
	message: string
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Course | Error>
) {
	const { courseId } = req.query
	const course = await Prisma.client.course.findFirst({
		where: {
			id: { equals: courseId.toString() }
		},
		include: {
			students: true,
			assignments: true,
			teachingStaff: true
		}
	})
	if (course)
		res.status(200).json(course)
	else
		res.status(404).json({ message: 'Course not found.'})
})
