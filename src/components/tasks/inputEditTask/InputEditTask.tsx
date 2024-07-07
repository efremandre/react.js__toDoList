import React, {KeyboardEvent} from 'react'
import {Check, Cancel} from "@mui/icons-material";
import { styled } from '@mui/system';
import './InputEditTask.scss'

type TasksProps = {
	index: number
	changeInput: string
	handleCancel: () => void
	handleSaveTaskTitle: (index: number) => void
	setChangeInputValue: (value: string) => void
}

const StyledCheckIcons = styled(Check)({
	fontSize: 16,
	color: 'darkgray',
	'&:hover': {
		color: 'green',
	}
});

const StyledCancelIcons = styled(Cancel)({
	fontSize: 16,
	color: 'darkgray',
	'&:hover': {
		color: 'red',
	}
});

const InputEditTask: React.FC<TasksProps> = ({
	index,
	changeInput,
	handleCancel,
	handleSaveTaskTitle,
	setChangeInputValue
}) => {

	const getEditTitleTask = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setChangeInputValue(ev.target.value)
	}

	const handlePressKey = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === 'Enter') {
			handleSaveTaskTitle(index)
		}

		if (ev.key === 'Escape') {
			handleCancel()
		}
	}

	return (
		<div onKeyDown={handlePressKey} className="relative flex align-center gap-4 p-4">
			<div className='flex flex-col justify-between'>
				<button className='buttonEdit uppercase' onClick={() => {handleCancel()}}>< StyledCancelIcons /></button>
				<button className='buttonEdit uppercase' onClick={() => {handleSaveTaskTitle(index)}}>< StyledCheckIcons /></button>
			</div>
			<input
				autoFocus
				onChange={getEditTitleTask}
				className='inputEdit block flex-1 text-xl py-2 px-4 pr-8 w-full'
				value={changeInput}
				type='text'
				tabIndex={0}/>
		</div>
	)
}

export default InputEditTask
