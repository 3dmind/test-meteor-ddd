import * as React from 'react'
import { TaskEntity } from '../../domain/TaskEntity'
import { useActions } from '../TaskActions'

interface ActiveTasksListItemProps {
  task: TaskEntity
}

export const ActiveTasksListItem: React.FunctionComponent<
  ActiveTasksListItemProps
> = (props) => {
  const { task } = props
  const {
    tickOffTaskAction,
    resumeTaskAction,
    discardTaskAction,
    archiveTaskAction,
  } = useActions()

  const handleFulfilled = (message: string) => (): void => console.log(message)
  function handleRejected(error): void {
    console.log(error)
  }

  function tickOff(): void {
    tickOffTaskAction(task.id)
      .then(handleFulfilled('tickedOff'))
      .catch(handleRejected)
  }

  function resume(): void {
    resumeTaskAction(task.id)
      .then(handleFulfilled('resumed'))
      .catch(handleRejected)
  }

  function handleChange(): void {
    task.isTickedOff() ? resume() : /* otherwise */ tickOff()
  }

  function handleClickDiscard(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    discardTaskAction(task.id)
      .then(handleFulfilled('discarded'))
      .catch(handleRejected)
  }

  function handleClickArchive(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    archiveTaskAction(task.id)
      .then(handleFulfilled('archived'))
      .catch(handleRejected)
  }

  return (
    <li>
      <label htmlFor={'tickOff'}>
        <input
          id={'tickOff'}
          type={'checkbox'}
          checked={task.isTickedOff()}
          onChange={handleChange}
        />
      </label>
      <span>{task.description.value}</span>
      <button type={'button'} onClick={handleClickDiscard}>
        Discard
      </button>
      <button type={'button'} onClick={handleClickArchive}>
        Archive
      </button>
    </li>
  )
}
