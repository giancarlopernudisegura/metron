import { PrismaClient } from '@prisma/client'

export default class Prisma {
	private static _client: PrismaClient

	private constructor() { }
	
	public static get client() {
		if (!Prisma._client) {
			Prisma._client = new PrismaClient()
		}
		return Prisma._client
	}
}

export class User {
	private constructor() { }

	public static async instance(email: string) {
		const user = await Prisma.client.user.findFirst({ where: { email: { equals: email } } })
		return user ? user : Prisma.client.user.create({ data: { email, isAdmin: false } })
	}
}
