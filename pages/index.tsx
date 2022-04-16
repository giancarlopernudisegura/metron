import type { NextPage } from 'next'
import Head from 'next/head'
import { withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0'
import Page from '@components/Page'
import { Card, Box } from '@mui/material'

interface PageProps {
	user: UserProfile
}

const Home: NextPage<PageProps> = ({ user }: PageProps) => {
	return <>
		<Head>
			<title>Metron</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Page user={user}>
			<Card>
				<Box padding={2}>
					/
				</Box>
			</Card>
		</Page>
	</>
}

export default Home

export const getServerSideProps = withPageAuthRequired()
