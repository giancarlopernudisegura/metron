import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import { Box, Card, Skeleton, Typography } from '@mui/material'
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
					<Typography variant='h5'>{assignment?.dateDue.toString() || <Skeleton />}</Typography>
					<Typography variant='body1'>{assignment?.description || <Skeleton />}</Typography>
				</Box>
			</Card>
		</Page>
	</>
}

export default AssignmentPage

export const getServerSideProps = withPageAuthRequired()
