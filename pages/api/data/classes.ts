import Prisma from '@library/prisma'
import { Class } from '.prisma/client/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

type Data = {
	classes: Class[]
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const _classes = await Prisma.client.class.findMany()
	res.status(200).json({ classes: _classes })
})
