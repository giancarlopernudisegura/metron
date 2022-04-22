import Prisma, { User } from '@lib/prisma'
import { User as UserType } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'

type Data = {
	user: UserType
}

export default withApiAuthRequired(async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const session = getSession(req, res)
	const _user = await User.instance(session?.user?.email.toString())
	res.status(200).json({ user: _user })
})
