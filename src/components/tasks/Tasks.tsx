import React from 'react'
import InputEditTask from './inputEditTask/InputEditTask'
import TaskItem from './taskItem/TaskItem'

type Tasks = {
	taskTitle: string
	taskDone: boolean
}

type TasksProps = {
	tasks: Tasks[]
	taskIndex: number | null
	changeInput: string
	handleCancel: () => void
	handleEditTaskTitle: (index: number) => void
	handleSaveTaskTitle: (index: number) => void
	setChangeInputValue: (value: string) => void
	handleDoneTask: (index: number) => void
	handleDeletedTask: (index: number) => void
}

const Tasks: React.FC<TasksProps> = ({
	tasks,
	taskIndex,
	handleEditTaskTitle,
	handleSaveTaskTitle,
	handleDoneTask,
	handleDeletedTask,
	handleCancel,
	setChangeInputValue,
	changeInput
}) => {

	return (
		<div className="grow shrink-0 basis-auto flex flex-col">
			{(tasks.length === 0) ?
				<div className='grow shrink-0 basis-auto flex flex-col justify-center h-vh'>
					<p className='text-center text-gray-400 font-bold'>What are your plans?</p>
				</div> :
				<ul className="flex flex-col overflow-y-auto mb-6">
					{tasks.map((task: Tasks, index: number) => (
						<li key={index}>
							<div className="relative">
								{(taskIndex === index) ?
									<InputEditTask
										index={index}
										changeInput={changeInput}
										handleCancel={handleCancel}
										setChangeInputValue={setChangeInputValue}
										handleSaveTaskTitle={handleSaveTaskTitle} /> :
									<TaskItem
										task={task}
										index={index}
										handleEditTaskTitle={handleEditTaskTitle}
										handleDoneTask={handleDoneTask}
										handleDeletedTask={handleDeletedTask} />}
							</div>
						</li>
					))}
				</ul>
			}
		</div>
	)
}

export default Tasks
