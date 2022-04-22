import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'

interface ComponentProps {
	rows: any[],
	columns: GridColDef[],
	rowsPerPageOptions: number[],
	type: string,
	addAction: () => Promise<void>,
	removeAction: () => Promise<void>,
	selectionState: [GridSelectionModel, Dispatch<SetStateAction<GridSelectionModel>>],
	emailTextState: [string, Dispatch<SetStateAction<string>>]
}

const UsersTable = ({ rows, columns, rowsPerPageOptions = [10, 25, 50, 100, 300], type, addAction, removeAction, selectionState, emailTextState }: ComponentProps) => {
	const [selection, setSelection] = selectionState
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const [showAdditionDialog, setShowAdditionDialog] = useState(false)
	const [emailsText, setEmailsText] = emailTextState
	const typeCapitalized = type.replace(/^\w/, c => c.toUpperCase())
	const closeDeleteConfirmation = () => setShowDeleteConfirmation(false)
	const closeAdditionDialog = () => setShowAdditionDialog(false)

	return <>
		<DataGrid
			columns={columns}
			onSelectionModelChange={setSelection}
			rows={rows}
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
			<Button onClick={() => setShowAdditionDialog(true)}>Add {type}s</Button>
		</Stack>
		<Dialog
			open={showDeleteConfirmation}
			onClose={closeDeleteConfirmation}
		>
			<DialogTitle>Confirm Removal</DialogTitle>
			<DialogContent>
				<Typography>Are you sure you want to remove {selection.length > 1 ? `these ${type}s` : `this ${type}`} from the course?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDeleteConfirmation}>Cancel</Button>
				<Button onClick={removeAction} color='error'>Remove</Button>
			</DialogActions>
		</Dialog>
		<Dialog
			open={showAdditionDialog}
			onClose={closeAdditionDialog}
		>
			<DialogTitle>Bulk Enroll {typeCapitalized}s</DialogTitle>
			<DialogContent>
				<Typography>Paste the emails of {type}s separated by a comma. {typeCapitalized}s must already have an account on Metron.</Typography>
				<TextField
					fullWidth
					required
					label={`${typeCapitalized} Email`}
					value={emailsText}
					onChange={({ target: { value } })  => setEmailsText(value)}
					multiline
					maxRows={10}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeAdditionDialog}>Cancel</Button>
				<Button onClick={addAction} disabled={emailsText.length === 0}>Add</Button>
			</DialogActions>
		</Dialog>
	</>
}

export default UsersTable
