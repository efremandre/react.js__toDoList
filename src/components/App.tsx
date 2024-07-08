import React, { ChangeEvent, KeyboardEvent } from 'react'
import {saveToLocalStorage, loadFromLocalStorage} from '../utility/localstorage.ts'
import Taskcreater from '../components/taskcreater/Taskcreater'
import Tasks from '../components/tasks/Tasks'
import {Cancel} from "@mui/icons-material";
import './App.css'
import '../index.css'
import {styled} from "@mui/system";

type Task = {
	taskTitle: string
	taskDone: boolean
}

const StyledCancelIcons = styled(Cancel)({
	fontSize: 16,
	color: 'darkgray',
	'&:hover': {
		color: 'red',
	}
});

const App: React.FC = () => {
	const [tasks, setTasks] = React.useState<Task[]>( () => loadFromLocalStorage('tasks') || [] )
	const [inputValue, setInputValue] = React.useState<string>('')
	const [changeInput, setChangeInputValue] = React.useState<string>('')
	const [taskIndex, setTaskIndex] = React.useState<number | null>(null)
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	React.useEffect(() => {
		saveToLocalStorage('tasks', tasks);
	}, [tasks])

	const getValue = (ev: ChangeEvent<HTMLInputElement>) => {
		setInputValue(ev.target.value)
	}

	const handleCreateTask = () => {
		if (inputValue.trim()) {
			setTasks([...tasks, { taskTitle: inputValue, taskDone: false }])
			setInputValue('')
		}
	}

	const handleClearTextInput = ():void => {
		setInputValue('')
	}

	const handleDoneTask = (index: number | null) => {
		const tempArr = tasks.map((task, i) => (index === i) ? { ...task, taskDone: !task.taskDone } : task)
		setTasks(tempArr)
	}

	const handleDeletedTask = (index: number | null) => {
		const tempArr = tasks.filter((_, i) => i !== index)
		setTasks(tempArr)
	}

	const handleEditTaskTitle = (index: number | null) => {
		if (index === null) return
		setTaskIndex(index)
		setChangeInputValue(tasks[index].taskTitle)
	}

	const handleCancel = () => {
		setChangeInputValue('')
		setTaskIndex(null)
	}

	const handleSaveTaskTitle = (index: number | null) => {
		if(!changeInput) {
			handleCancel()
			return
		}
		const tempArr = tasks.map((task, i) => (i === index) ? { ...task, taskTitle: changeInput } : task)
		setTasks(tempArr)
		setChangeInputValue('')
		setTaskIndex(null)
	}

	const handlePressKeyCreateInput = (ev: KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === 'Enter') {
			handleCreateTask()
		}

		if (ev.key === 'Escape') {
			handleClearTextInput()
		}
	}

	const toggleInfoShow = () => {
		if (!isOpen) setIsOpen(true)
		if (isOpen) setIsOpen(false)
	}

	return (
		<>
			{isOpen ? <div className='fixed top-4 left-4 max-w-64 p-4 text-xs text-gray-400 border border-gray-300 rounded-md'>
				<button tabIndex={0} className='absolute top-2 right-2' onClick={toggleInfoShow}><StyledCancelIcons /></button>
				<ul className='flex flex-col gap-2'>
					<li>
						<p><strong>Press Enter</strong> - create Task and Save change Task Item</p>
					</li>
					<li>
						<p><strong>Press Esc</strong> - cancel input create Task and cancel change Task Item</p>
					</li>
					<li>
						<p><strong>Double click for Task</strong> - change Task item</p>
					</li>
				</ul>
			</div> :
				<button className='fixed top-4 left-4 max-w-60 p-3 text-xs text-gray-400 border border-gray-300 rounded-md' onClick={toggleInfoShow}>Info</button>}
			<div className="wrapper flex flex-col max-w-screen-md min-h-full pt-6 pb-16 mx-auto">
				<div className="grow shrink-0 basis-auto flex flex-col gap-5">
					<Tasks
						tasks={tasks}
						taskIndex={taskIndex}
						changeInput={changeInput}
						setChangeInputValue={setChangeInputValue}
						handleCancel={handleCancel}
						handleSaveTaskTitle={handleSaveTaskTitle}
						handleEditTaskTitle={handleEditTaskTitle}
						handleDeletedTask={handleDeletedTask}
						handleDoneTask={handleDoneTask} />
					<Taskcreater
						getValue={getValue}
						handlePressKeyCreateInput={handlePressKeyCreateInput}
						inputValue={inputValue}
						handleCreateTask={handleCreateTask}
						handleClearTextInput={handleClearTextInput}/>
				</div>
			</div >
		</>

	)
}

export default App
