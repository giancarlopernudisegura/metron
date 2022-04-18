import type { NextPage } from 'next'
import Head from 'next/head'
import { withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import AssignmentCard from '@components/AssignmentsCard'
import { User } from '@library/prisma'
import { useEffect, useState } from 'react'
import { Assignment } from '@prisma/client'

interface PageProps {
	user: UserProfile
}

const Home: NextPage<PageProps> = ({ user }: PageProps) => {
	// fetch to trigger a user row creation on the db
	fetch('/api/data/user')
	const [assignments, setAssignments] = useState<Assignment[]>([])
	useEffect(() => {
		fetch('/api/data/assignments')
			.then(res => res.json())
			.then(data => {
				const assignments = data.assignments as Assignment[]
				setAssignments(assignments)
			})
	}, [])
	return <>
		<Head>
			<title>Metron</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Page user={user}>
			<AssignmentCard assignments={assignments} />
		</Page>
	</>
}

export default Home

export const getServerSideProps = withPageAuthRequired()
