import { Card, Box, Typography, List, ListItem, ListItemText, ListItemButton, Link } from '@mui/material'
import { Assignment } from '@prisma/client'
import AssignmentsList from '@components/AssignmentsList'

interface ComponentProps {
	assignments: Assignment[]
}

const AssignmentsCard = ({ assignments }: ComponentProps) => {
	return <Card>
		<Box paddingX={2} paddingTop={2}>
			<Typography variant="h4">Assignments</Typography>
		</Box>
		<AssignmentsList assignments={assignments} />
	</Card>
}

export default AssignmentsCard
