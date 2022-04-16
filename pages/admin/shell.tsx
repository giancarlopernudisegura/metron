import type { NextPage } from 'next'
import Head from 'next/head'
import { withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import { Box, Button, Card, Typography } from '@mui/material'

interface PageProps {
	user: UserProfile
}

const Shell: NextPage<PageProps> = ({ user }: PageProps) => {
	return <>
		<Head>
			<title>Metron</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Page user={user}>
			<Card>
				<Box padding={2}>
					<Typography variant="h4">Shell</Typography>
					$ >
				</Box>
			</Card>
		</Page>
	</>
}

export default Shell

export const getServerSideProps = withPageAuthRequired()
