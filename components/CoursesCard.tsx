import { Card, Box, Typography, List, ListItem, ListItemText, ListItemButton, Link } from '@mui/material'
import { Course } from '@prisma/client'

interface ComponentProps {
	courses: Course[]
}

const CoursesCard = ({ courses }: ComponentProps) => {
	return <Card>
		<Box paddingX={2} paddingTop={2}>
			<Typography variant="h4">Courses</Typography>
		</Box>
		<List>
			{courses.map(course => {
				return <Link key={course.id} href={`/course/${course.id}`} underline='none'>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary={course.name} />
						</ListItemButton>
					</ListItem>
				</Link>
			})}
		</List>
	</Card>
}

export default CoursesCard
