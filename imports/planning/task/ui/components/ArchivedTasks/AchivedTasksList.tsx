import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { ArchivedTasksListItem } from './ArchivedTasksListItem'

interface ArchivedTasksListProps {
  taskList: TaskUiModel[]
}

export const ArchivedTasksList: React.FunctionComponent<
  ArchivedTasksListProps
> = (props) => {
  const { taskList } = props

  if (taskList.length) {
    return (
      <>
        <h2>Archive</h2>
        <ul>
          {taskList.map((task: TaskUiModel) => (
            <ArchivedTasksListItem
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
