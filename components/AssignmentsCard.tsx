import { Card, Box, Typography, List, ListItem, ListItemText, ListItemButton, Link } from '@mui/material'
import { Assignment } from '@prisma/client'

interface ComponentProps {
	assignments: Assignment[]
}

const Assignmentcard = ({ assignments }: ComponentProps) => {
	return <Card>
		<Box paddingX={2} paddingTop={2}>
			<Typography variant="h4">Assignments</Typography>
		</Box>
		<List>
			{assignments.map(assignment => {
				return <Link key={assignment.id} href={`/assignment/${assignment.id}`} underline='none'>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary={assignment.name} secondary={`Due: ${assignment.dateDue.toString()}`}></ListItemText>
						</ListItemButton>
					</ListItem>
				</Link>
			})}
		</List>
	</Card>
}

export default Assignmentcard
