import Prisma from '@library/prisma'
import { Course } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

type Data = {
	courses: Course[]
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
			const courses = await Prisma.client.course.findMany()
			res.status(200).json({ courses })
			break
		case 'POST':
			const { name } = req.body
			if (!name) {
				res.status(400).end()
			} else {
				try {
					const newClass = await Prisma.client.course.create({ data: { name } })
					res.status(200).json({ courses: [newClass] })
				} catch (err: any) {
					const error = { error: err.code.toString() }
					res.status(409).json(error)
				}
			}
			break
		default:
			res.status(405).end()
			break
	}
})
