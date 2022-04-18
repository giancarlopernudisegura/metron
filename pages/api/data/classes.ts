import Prisma from '@library/prisma'
import { Class } from '.prisma/client/index'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	classes: Class[]
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const _classes = await Prisma.client.class.findMany()
	res.status(200).json({ classes: _classes })
}
