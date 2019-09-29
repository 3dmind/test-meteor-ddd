import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { ActiveTasksListItem } from './ActiveTasksListItem'

interface ActiveTasksListProps {
  taskList: TaskUiModel[]
}

export const ActiveTasksList: React.FunctionComponent<ActiveTasksListProps> = (
  props,
) => {
  const { taskList } = props

  if (taskList.length) {
    return (
      <>
        <h2>Todo</h2>
        <ul>
          {taskList.map((task: TaskUiModel) => (
            <ActiveTasksListItem
              key={task.taskId}
              taskId={task.taskId}
              description={task.description}
              isTickedOff={task.isTickedOff}
            />
          ))}
        </ul>
      </>
    )
  } else {
    return null
  }
}