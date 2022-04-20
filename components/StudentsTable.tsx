import { Student } from '@prisma/client'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {validate as validateEmail} from 'isemail'

interface ComponentProps {
	students: Student[]
}

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Email',
		description: 'The email corresponding to the student',
		flex: 1
	}
]

const rowsPerPageOptions = [10, 25, 50, 100, 300]

const transformStudentsList = (students: Student[]) => {
	return students.map(({userEmail}) => ({
		id: userEmail
	}))
}

const StudentsTable = ({ students }: ComponentProps) => {
	const [selection, setSelection] = useState<GridSelectionModel>([])
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const [showAdditionDialog, setShowAdditionDialog] = useState(false)
	const [emailsText, setEmailsText] = useState<string>('')
	const router = useRouter()
	const { courseId } = router.query
	const closeDeleteConfirmation = () => setShowDeleteConfirmation(false)
	const closeAdditionDialog = () => setShowAdditionDialog(false)
	const removeStudents = async () => {
		await fetch(`/api/data/courses/${courseId}/students`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'DELETE',
			body: JSON.stringify({ students: selection })
		})
		closeDeleteConfirmation()
		router.reload()
	}
	const bulkAddStudents = () => {
		const emails = emailsText.split(',')
			.map(e => e.trim())
			.filter(validateEmail)
		fetch(`/api/data/courses/${courseId}/students`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ emails })
		})
			.then(res => router.reload())
	}

	return <>
		<DataGrid
			columns={columns}
			onSelectionModelChange={setSelection}
			rows={transformStudentsList(students) }
			pageSize={rowsPerPageOptions[0]}
			rowsPerPageOptions={rowsPerPageOptions}
			checkboxSelection
			disableSelectionOnClick
			disableDensitySelector
			autoHeight
		/>
		<Stack direction='row' justifyContent='space-between'>
			<Button
				disabled={selection.length === 0}
				color='error'
				onClick={() => setShowDeleteConfirmation(true)}
			>Remove selected from course</Button>
			<Button onClick={() => setShowAdditionDialog(true)}>Add students</Button>
		</Stack>
		<Dialog
			open={showDeleteConfirmation}
			onClose={closeDeleteConfirmation}
		>
			<DialogTitle>Confirm Removal</DialogTitle>
			<DialogContent>
				<Typography>Are you sure you want to remove these students from the course?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDeleteConfirmation}>Cancel</Button>
				<Button onClick={removeStudents} color='error'>Remove</Button>
			</DialogActions>
		</Dialog>
		<Dialog
			open={showAdditionDialog}
			onClose={closeAdditionDialog}
		>
			<DialogTitle>Bulk Enroll Students</DialogTitle>
			<DialogContent>
				<Typography>Paste the emails of students separated by a comma. Students must already have an account on Metron.</Typography>
				<TextField
					fullWidth
					required
					label='Student Email'
					value={emailsText}
					onChange={({target: {value}})  => setEmailsText(value)}
					multiline
					maxRows={10}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeAdditionDialog}>Cancel</Button>
				<Button onClick={bulkAddStudents} disabled={emailsText.length === 0}>Add</Button>
			</DialogActions>
		</Dialog>
	</>
}

export default StudentsTable
