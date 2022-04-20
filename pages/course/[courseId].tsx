import { getSession, UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import AssignmentsList from '@components/AssignmentsList'
import StudentsTable from '@components/StudentsTable'
import Page from '@components/Page'
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import { Assignment, Course, Student } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'

interface CourseExtended {
	assignments: Assignment[],
	students: Student[]
}

interface PageProps {
	user: UserProfile
	course: Course & CourseExtended
}

const CoursePage: NextPage<PageProps> = ({ user, course }: PageProps) => {
	return <>
		<Head>
			<title>Metron</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<Page user={user}>
			<Card>
				<Box padding={2}>
					<Typography variant='h4'>{course.name}</Typography>
					<Divider variant="middle" />
					<Typography variant='h5' marginTop={2}>Assignments</Typography>
					<AssignmentsList assignments={course.assignments} />
					<Divider variant="middle" />
					<Typography variant='h5' marginTop={2}>Students</Typography>
					<StudentsTable students={course.students} />
				</Box>
			</Card>
		</Page>
	</>
}

export default CoursePage

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({req, query}) {
		const { courseId } = query
		const response = await fetch(`http://${req.headers.host}/api/data/courses/${courseId}`, {
			headers: {
				cookie: req.headers.cookie || '',
			}
		})
		if (!response.ok)
			return { notFound: true }
		const course = await response.json() as Course
		return { props: { course } }
	}
})
