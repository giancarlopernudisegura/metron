import type { NextPage } from 'next'
import Head from 'next/head'
import { withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import AssignmentsCard from '@components/AssignmentsCard'
import { useEffect, useState } from 'react'
import { Assignment, Course, User } from '@prisma/client'
import CreateFab from '@components/CreateFab'
import { Alert, Snackbar, Stack } from '@mui/material'
import CoursesCard from '@components/CoursesCard'

interface PageProps {
	user: UserProfile
}

const Home: NextPage<PageProps> = ({ user }: PageProps) => {
	const [assignments, setAssignments] = useState<Assignment[]>([])
	const [courses, setCourses] = useState<Course[]>([])
	const [isAdmin, setIsAdmin] = useState(false)
	const [error, setError] = useState('')
	const closeError = () => setError('')

	useEffect(() => {
		fetch('/api/data/user')
			.then(res => res.json())
			.then(data => {
				const u = data.user as User
				setIsAdmin(u.isAdmin)
			})
		fetch('/api/data/assignments')
			.then(res => res.json())
			.then(data => {
				const assignments = data.assignments as Assignment[]
				setAssignments(assignments)
			})
	}, [])
	useEffect(() => {
		if (isAdmin) {
			fetch('/api/data/courses')
				.then(res => res.json())
				.then(data => {
					const courses = data.courses as Course[]
					setCourses(courses)
				})
		}
	}, [isAdmin])
	return <>
		<Head>
			<title>Metron</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<Page user={user}>
			<Snackbar open={error.length > 0} autoHideDuration={5000} onClose={closeError}>
				<Alert severity='error' sx={{ marginBottom: 2 }} onClose={closeError}>{error}</Alert>
			</Snackbar>
			<Stack spacing={2}>
				<AssignmentsCard assignments={assignments} />
				{isAdmin && <CoursesCard courses={courses} />}
			</Stack>
			<CreateFab setError={setError} />
		</Page>
	</>
}

export default Home

export const getServerSideProps = withPageAuthRequired()
