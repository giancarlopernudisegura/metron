import { List, ListItem, ListItemText, ListItemButton, Link } from '@mui/material'
import { Assignment } from '@prisma/client'

interface ComponentProps {
	assignments: Assignment[]
}

const AssignmentsList = ({ assignments }: ComponentProps) => {
	return <List>
		{assignments.map(assignment => {
			return <Link key={assignment.id} href={`/assignment/${assignment.id}`} underline='none'>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemText primary={assignment.name} secondary={`Due: ${assignment.dateDue.toString()}`} />
					</ListItemButton>
				</ListItem>
			</Link>
		})}
	</List>
}

export default AssignmentsList
