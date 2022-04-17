import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'

type Data = {
	programs: string[]
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	exec('compgen -c', {
		shell: '/bin/bash'
	}, (err, stdout, stderr) => {
		res.status(200).json({ programs: stdout.split('\n') })
	})
}
