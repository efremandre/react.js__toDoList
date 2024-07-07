import React, {KeyboardEvent} from 'react'
import './TaskItem.scss'
import {Delete} from "@mui/icons-material";
import { styled } from '@mui/system';

type Tasks = {
	taskTitle: string
	taskDone: boolean
}

type TasksProps = {
	task: Tasks
	index: number
	handleDoneTask: (index: number) => void
	handleEditTaskTitle: (index: number) => void
	handleDeletedTask: (index: number) => void
}

const StyledDeleteIcon = styled(Delete)({
	fontSize: 16,
	color: 'darkgray',
	'&:hover': {
		color: 'red',
	},
});

const TaskItem: React.FC<TasksProps> = ({
	task,
	index,
	handleDoneTask,
	handleDeletedTask,
	handleEditTaskTitle
}) => {

	const pressDoubleEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === 'Enter') {
			handleEditTaskTitle(index)
		}
	}

	return (
		<>
			<div className="taskItem min-h-full flex items-center gap-2 p-4">
				<label className="checkmarkWrapper">
					<input type="checkbox" checked={task.taskDone} onChange={() => { handleDoneTask(index) }} />
					<div className="checkmark"></div>
				</label>
				<span onKeyPress={pressDoubleEnter} tabIndex={index + 1} title="Double click to edit the Task"
					className={`taskTitle block flex-1 text-xl py-2 px-4 pr-8 outline-none ${task.taskDone ? 'text-gray-400 line-through' : 'text-black'}`}
					onDoubleClick={() => { handleEditTaskTitle(index) }}>{task.taskTitle}</span>
			</div>
			<div className="absolute top-1/2 -translate-y-1/2 right-6">
				<button className="buttons p-1 uppercase" onClick={() => { handleDeletedTask(index) }}>
					<StyledDeleteIcon />
				</button>
				{/*<button className="buttons text-xs p-1 uppercase" onClick={() => { handleEditTaskTitle(index) }}>Edit</button>*/}
			</div>
		</>
	)
}

export default TaskItem
