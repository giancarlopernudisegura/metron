import { getSession, UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import { Assignment } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'

interface PageProps {
	user: UserProfile
	assignment: Assignment
}

const AssignmentPage: NextPage<PageProps> = ({ user, assignment }: PageProps) => {
	return <>
		<Head>
			<title>Metron</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<Page user={user}>
			<Card>
				<Box padding={2}>
					<Typography variant='h4'>{assignment.name}</Typography>
					<Typography variant='h6'>{`Due: ${assignment.dateDue.toString()}`}</Typography>
					<Divider variant="middle" />
					<Typography variant='body1'>{assignment.description}</Typography>
					<Stack direction='row' justifyContent='flex-end' spacing={1}>
						<Button variant='outlined'>Submit a test case</Button>
						<Button variant='contained'>Run a solution</Button>
					</Stack>
				</Box>
			</Card>
		</Page>
	</>
}

export default AssignmentPage

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({req, res, query}) {
		const { assignmentId } = query
		const session = getSession(req, res)
		const response = await fetch(`http://${req.headers.host}/api/data/assignments/${assignmentId}`, {
			headers: {
				cookie: req.headers.cookie
			}
		})
		if (!response.ok)
			return { notFound: true }
		const assignment = await response.json() as Assignment
		return { props: { assignment } }
	}
})
