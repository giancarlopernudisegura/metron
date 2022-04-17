import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	id: number | undefined
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const _class = await prisma.class.findFirst()
	res.status(200).json({ id: _class?.id })
}
