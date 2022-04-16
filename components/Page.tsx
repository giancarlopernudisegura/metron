import NavBar from '@components/NavBar'
import { UserProfile } from '@auth0/nextjs-auth0'
import { Box } from '@mui/material'

interface PageProps {
	user: UserProfile
	children: React.ReactNode
}

const Page = ({ user, children }: PageProps) => {
	return <div>
		<NavBar user={user} />
		<Box padding={2}>
			{children}
		</Box>
	</div>
}

export default Page
