import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Slide, Stack, TextField, Zoom } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Course } from '@prisma/client'
import { useRouter } from 'next/router'

interface ComponentProps {
	setError: Dispatch<SetStateAction<string>>
}

const FabGroup = ({ setError } : ComponentProps) => {
	const [showOptions, setShowOptions] = useState(false)
	const [showCourseForm, setShowCourseForm] = useState(false)
	const [showAssignmentForm, setShowAssignmentForm] = useState(false)
	const [courseName, setCourseName] = useState('')
	const [assignmentName, setAssignmentName] = useState('')
	const [assignmentDescription, setAssignmentDescription] = useState('')
	const [assignmentCourseName, setAssignmentCourseName] = useState('')
	const [courseNames, setCourseNames] = useState<string[]>([])
	const router = useRouter()

	const openCourseForm = () => setShowCourseForm(true)
	const closeCourseForm = () => setShowCourseForm(false)
	const openAssignmentForm = () => setShowAssignmentForm(true)
	const closeAssignmentForm = () => setShowAssignmentForm(false)

	const createCourse = async () => {
		const response = await fetch('/api/data/courses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: courseName
			})
		})
		if (!response.ok) {
			if (response.status === 409)
				setError('This course already exists. Please use a different name.')
			else
				setError('An error occured. Please try again later.')
		} else {
			setCourseNames(courseNames.concat([courseName]))
			setCourseName('')
		}
		closeCourseForm()
	}
	const createAssignment = async () => {
		const response = await fetch('/api/data/assignments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: assignmentName,
				description: assignmentDescription,
				courseName: assignmentCourseName
			})
		})
		if (!response.ok) {
			if (response.status === 409)
				setError('This assignment already exists. Please use a different name.')
			else
				setError(response.body.error || 'An error occured. Please try again later.')
		} else {
			router.reload()
		}
		closeAssignmentForm()
	}

	useEffect(() => {
		fetch('/api/data/courses')
			.then(res => res.json())
			.then(data => {
				const courses = data.courses as Course[]
				setCourseNames(courses.map(c => c.name))
			})
	}, [])

	return <>
		<Box position='absolute' sx={{
			width: '100%',
			bottom: 16,
			right: 16
		}}>
			<Zoom in>
				<Fab color='primary' aria-label='add' sx={{
					position: 'absolute',
					bottom: 0,
					right: 0
				}} onClick={() => setShowOptions(!showOptions)}>
					<AddIcon />
				</Fab>
			</Zoom>
			<Slide direction='up' in={showOptions}>
				<Box>
					<Fab
						color='primary'
						variant='extended'
						aria-label='add'
						sx={{
							position: 'absolute',
							bottom: 132,
							right: 0
						}}
						onClick={openCourseForm}
					>
						<AddIcon />
						Create Course
					</Fab>
					<Fab
						color='primary'
						variant='extended'
						aria-label='add'
						sx={{
							position: 'absolute',
							bottom: 68,
							right: 0
						}}
						onClick={openAssignmentForm}
					>
						<AddIcon />
						Create Assignment
					</Fab>
				</Box>
			</Slide>
		</Box>
		<Dialog maxWidth='sm' fullWidth open={showCourseForm} onClose={closeCourseForm}>
			<DialogTitle>New course</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{marginBottom: 2}}>Create a new course.</DialogContentText>
				<TextField fullWidth required aria-required label='Name' value={courseName} onChange={e => setCourseName(e.target.value)} />
				<DialogActions>
					<Button onClick={() => { closeCourseForm(); setCourseName('') }}>Cancel</Button>
					<Button disabled={!courseName} onClick={createCourse}>Create</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
		<Dialog maxWidth='sm' fullWidth open={showAssignmentForm} onClose={closeAssignmentForm}>
			<DialogTitle>New assignment</DialogTitle>
			<DialogContent>
				<DialogContentText sx={{ marginBottom: 2 }}>Create a new assignment.</DialogContentText>
				<Stack spacing={2}>
					<Autocomplete
						aria-required
						onChange={({ target }) => {
							if (courseNames[target.value])
								setAssignmentCourseName(courseNames[target.value])
							else
								setAssignmentCourseName('')
						}}
						options={courseNames}
						renderInput={(params) => <TextField {...params} label='Course' />}
					/>
					<TextField
						fullWidth
						required
						aria-required
						label='Name'
						value={assignmentName}
						onChange={e => setAssignmentName(e.target.value)} />
					<TextField
						fullWidth
						required
						aria-required
						label='Description'
						value={assignmentDescription}
						onChange={e => setAssignmentDescription(e.target.value)} multiline minRows={2} maxRows={5} />
				</Stack>
				<DialogActions>
					<Button onClick={() => { closeAssignmentForm(); setAssignmentName('') }}>Cancel</Button>
					<Button disabled={!assignmentCourseName || !assignmentName || !assignmentDescription} onClick={createAssignment}>Create</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	</>
}

export default FabGroup
