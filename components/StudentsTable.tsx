import { Student } from '@prisma/client'
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { validate as validateEmail } from 'isemail'
import UserTable from '@components/UserTable'

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
	return students.map(({ userEmail }) => ({
		id: userEmail
	}))
}

const StudentsTable = ({ students }: ComponentProps) => {
	const [selection, setSelection] = useState<GridSelectionModel>([])
	const [emailsText, setEmailsText] = useState<string>('')
	const router = useRouter()
	const { courseId } = router.query
	const removeStudents = async () => {
		await fetch(`/api/data/courses/${courseId}/students`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'DELETE',
			body: JSON.stringify({ students: selection })
		})
		router.reload()
	}
	const bulkAddStudents = async () => {
		const emails = emailsText.split(',')
			.map(e => e.trim())
			.filter(validateEmail)
		await fetch(`/api/data/courses/${courseId}/students`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ emails })
		})
		router.reload()
	}

	return <UserTable
		rows={transformStudentsList(students)}
		columns={columns}
		rowsPerPageOptions={rowsPerPageOptions}
		type='student'
		addAction={bulkAddStudents}
		removeAction={removeStudents}
		selectionState={[selection, setSelection]}
		emailTextState={[emailsText, setEmailsText]}
	/>
}

export default StudentsTable
