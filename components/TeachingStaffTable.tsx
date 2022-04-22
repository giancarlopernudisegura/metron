import { TeachingStaff } from '@prisma/client'
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { validate as validateEmail } from 'isemail'
import UserTable from '@components/UserTable'

interface ComponentProps {
	staff: TeachingStaff[]
}

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Email',
		description: 'The email corresponding to the teaching staff member',
		flex: 1
	}
]

const rowsPerPageOptions = [10, 25, 50, 100, 300]

const transformStaffList = (staff: TeachingStaff[]) => {
	return staff.map(({ userEmail }) => ({
		id: userEmail
	}))
}

const TeachingStaffTable = ({ staff }: ComponentProps) => {
	const [selection, setSelection] = useState<GridSelectionModel>([])
	const [emailsText, setEmailsText] = useState<string>('')
	const router = useRouter()
	const { courseId } = router.query
	const removeStaff = async () => {
		await fetch(`/api/data/courses/${courseId}/staff`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'DELETE',
			body: JSON.stringify({ teachingstaff: selection })
		})
		router.reload()
	}
	const bulkAddStaff = async () => {
		const emails = emailsText.split(',')
			.map(e => e.trim())
			.filter(validateEmail)
		await fetch(`/api/data/courses/${courseId}/staff`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ emails })
		})
		router.reload()
	}

	return <UserTable
		rows={transformStaffList(staff)}
		columns={columns}
		rowsPerPageOptions={rowsPerPageOptions}
		type='teaching staff member'
		addAction={bulkAddStaff}
		removeAction={removeStaff}
		selectionState={[selection, setSelection]}
		emailTextState={[emailsText, setEmailsText]}
	/>
}

export default TeachingStaffTable
