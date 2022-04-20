import type { NextPage } from 'next'
import Head from 'next/head'
import { withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import AssignmentCard from '@components/AssignmentsCard'
import { useEffect, useState } from 'react'
import { Assignment } from '@prisma/client'
import CreateFab from '@components/CreateFab'
import { Alert, Snackbar } from '@mui/material'

interface PageProps {
	user: UserProfile
}

const Home: NextPage<PageProps> = ({ user }: PageProps) => {
	const [assignments, setAssignments] = useState<Assignment[]>([])
	const [error, setError] = useState('')
	const closeError = () => setError('')

	// fetch to trigger a user row creation on the db
	fetch('/api/data/user')
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
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<Page user={user}>
			<Snackbar open={error.length > 0} autoHideDuration={5000} onClose={closeError}>
				<Alert severity='error' sx={{ marginBottom: 2 }} onClose={closeError}>{error}</Alert>
			</Snackbar>
			<AssignmentCard assignments={assignments} />
			<CreateFab setError={setError} />
		</Page>
	</>
}

export default Home

export const getServerSideProps = withPageAuthRequired()
