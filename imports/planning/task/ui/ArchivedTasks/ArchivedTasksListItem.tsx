import * as React from 'react'
import { TaskEntity } from '../../domain/TaskEntity'
import { useActions } from '../TaskActions'

interface ArchivedTasksListItemProps {
  task: TaskEntity
}

export const ArchivedTasksListItem: React.FunctionComponent<
  ArchivedTasksListItemProps
> = (props) => {
  const { task } = props
  const { discardTaskAction } = useActions()

  function handleFulfilled(): void {
    console.log('discarded')
  }

  function handleRejected(error): void {
    console.log(error)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    discardTaskAction(task.id)
      .then(handleFulfilled)
      .catch(handleRejected)
  }

  const styles = task.isTickedOff()
    ? { textDecoration: 'line-through' }
    : /* otherwise */ {}

  return (
    <li>
      <span style={styles}>{task.description.value}</span>
      <button type={'button'} onClick={handleClick}>
        Discard
      </button>
    </li>
  )
}
