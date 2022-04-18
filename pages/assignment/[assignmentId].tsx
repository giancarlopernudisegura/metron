import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import { Box, Button, Card, Divider, Skeleton, Stack, Typography } from '@mui/material'
import { Assignment } from '@prisma/client'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface PageProps {
	user: UserProfile
}

const AssignmentPage: NextPage<PageProps> = ({ user }: PageProps) => {
	const router = useRouter()
	const [assignment, setAssignment] = useState<Assignment | null>(null)
	const { assignmentId } = router.query
	useEffect(() => {
		fetch(`/api/data/assignments/${assignmentId}`)
			.then(res => res.json())
			.then(data => {
				const assignment = data as Assignment
				setAssignment(assignment)
			})
	}, [])
	return <>
		<Head>
			<title>Metron</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
		<Page user={user}>
			<Card>
				<Box padding={2}>
					<Typography variant='h4'>{assignment?.name || <Skeleton />}</Typography>
					<Typography variant='h6'>{assignment ? `Due: ${assignment?.dateDue.toString()}` : <Skeleton />}</Typography>
					<Divider variant="middle" />
					<Typography variant='body1'>{assignment?.description || <Skeleton />}</Typography>
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

export const getServerSideProps = withPageAuthRequired()
