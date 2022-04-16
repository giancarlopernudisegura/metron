import type { NextPage } from 'next'
import Head from 'next/head'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const Home: NextPage = () => {
	return (
		<Head>
			<title>Metron</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export const getServerSideProps = withPageAuthRequired()

export default Home
