import React, { ChangeEvent, KeyboardEvent } from 'react'
import './Taskcreater.scss'
import {Cancel} from "@mui/icons-material";
import { styled } from '@mui/system';

type TaskCreatorProps = {
	inputValue: string
	handleClearTextInput: () => void
	getValue: (ev: ChangeEvent<HTMLInputElement>) => void,
	handlePressKeyCreateInput: (ev: KeyboardEvent<HTMLInputElement>) => void,
	handleCreateTask: () => void
}

const StyledCancelIcons = styled(Cancel)({
	fontSize: 16,
	color: 'darkgray',
	'&:hover': {
		color: 'red',
	}
});

const Taskcreater: React.FC<TaskCreatorProps> = ({
	inputValue,
	handleClearTextInput,
	getValue,
	handlePressKeyCreateInput,
	handleCreateTask,
}) => {

	return (
		<div className="wrapperInputCreateTask fixed left-1/2 -translate-x-1/2 bottom-0 z-10 w-1/2 pb-6">
			<label htmlFor="inputTask">
				<input
					autoFocus
					onChange={getValue}
					onKeyDown={handlePressKeyCreateInput}
					value={inputValue}
					placeholder="Write and press Enter..."
					id="inputTask"
					className="inputCreate p-4 w-full focus:outline-none"
					type="text" />
				{(inputValue) ?
					<button
						className='absolute top-3.5 right-2'
						onClick={handleClearTextInput}><StyledCancelIcons /></button> : null }
			</label>
			<button
				className="hidden"
				onClick={handleCreateTask}
				type="button">Create Task</button>
		</div>
	)
}

export default Taskcreater
