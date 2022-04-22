import Prisma from '@lib/prisma'
import { Student } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

type Data = {
	students: Student[]
}

type Error = {
	message: string
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Error>
) {
	const { courseId } = req.query
	const course = await Prisma.client.course.findFirst({
		where: {
			id: { equals: courseId.toString() }
		}
	})
	if (!course) {
		res.status(404).json({ message: 'Course not found.' })
		return
	}
	switch (req.method) {
	case 'GET':
		const students = await Prisma.client.student.findMany({
			where: {
				courseId: { equals: course.id }
			}
		})
		res.status(200).json({ students })
		break
	case 'POST':
		const emails = req.body.emails as string[]
		const existingUsers = (await Prisma.client.user.findMany())
			.map(user => user.email)
		const emailsToAdd = emails
			.filter(email => existingUsers.includes(email))
			.map(email => ({
				userEmail: email,
				courseId: course.id
			}))
		await Prisma.client.student.createMany({
			data: emailsToAdd,
			skipDuplicates: true
		})
		res.status(200).end()
		break
	case 'DELETE':
		const studentsToRemove = req.body.students as string[]
		await Prisma.client.student.deleteMany({
			where: {
				courseId: { equals: course.id },
				userEmail: { in: studentsToRemove }
			}
		})
		res.status(200).end()
		break
	default:
		res.status(405).end()
	}
})
