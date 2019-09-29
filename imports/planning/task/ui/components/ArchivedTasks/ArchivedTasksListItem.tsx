import * as React from 'react'
import { TaskUiModel } from '../../TaskUiModel'
import { useActions } from '../TaskActions'

export const ArchivedTasksListItem: React.FunctionComponent<TaskUiModel> = (
  props,
) => {
  const { taskId, description, isTickedOff } = props
  const { discardTaskAction } = useActions()

  function handleFulfilled(): void {
    console.log('discarded')
  }

  function handleRejected(error): void {
    console.log(error)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    discardTaskAction(taskId)
      .then(handleFulfilled)
      .catch(handleRejected)
  }

  const styles = isTickedOff
    ? { textDecoration: 'line-through' }
    : /* otherwise */ {}

  return (
    <li>
      <span style={styles}>{description}</span>
      <button type={'button'} onClick={handleClick}>
        Discard
      </button>
    </li>
  )
}
