import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { useActions } from '../TaskActions'

export const ActiveTasksListItem: React.FunctionComponent<TaskUiModel> = (
  props,
) => {
  const { taskId, description, isTickedOff } = props
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
    tickOffTaskAction(taskId)
      .then(handleFulfilled('tickedOff'))
      .catch(handleRejected)
  }

  function resume(): void {
    resumeTaskAction(taskId)
      .then(handleFulfilled('resumed'))
      .catch(handleRejected)
  }

  function handleChange(): void {
    isTickedOff ? resume() : /* otherwise */ tickOff()
  }

  function handleClickDiscard(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    discardTaskAction(taskId)
      .then(handleFulfilled('discarded'))
      .catch(handleRejected)
  }

  function handleClickArchive(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    event.preventDefault()
    archiveTaskAction(taskId)
      .then(handleFulfilled('archived'))
      .catch(handleRejected)
  }

  return (
    <li>
      <label htmlFor={'tickOff'}>
        <input
          id={'tickOff'}
          type={'checkbox'}
          checked={isTickedOff}
          onChange={handleChange}
        />
      </label>
      <span>{description}</span>
      <button type={'button'} onClick={handleClickDiscard}>
        Discard
      </button>
      <button type={'button'} onClick={handleClickArchive}>
        Archive
      </button>
    </li>
  )
}
