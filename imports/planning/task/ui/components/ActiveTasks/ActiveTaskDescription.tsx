import { Typography } from '@material-ui/core'
import * as React from 'react'
import { TextField } from '@material-ui/core'
import { useActions } from '../TaskActions'

interface ActiveTaskDescriptionProps {
  taskId: string
  description: string
  isEditing: boolean
  onFinishEditing: () => void
}

export const ActiveTaskDescription: React.FunctionComponent<
  ActiveTaskDescriptionProps
> = (props) => {
  const { taskId, description, isEditing, onFinishEditing } = props
  const [text, setText] = React.useState<string>(description)
  const { editTaskAction } = useActions()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value)
  }

  function handleFulfilled(): void {
    console.log('edited')
  }

  function handleRejected(error): void {
    console.error(error)
  }

  function handleFinally(): void {
    onFinishEditing()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    editTaskAction(taskId, text)
      .then(handleFulfilled)
      .catch(handleRejected)
      .finally(handleFinally)
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin={'none'}
          value={text}
          onChange={handleChange}
        />
      </form>
    )
  } else {
    return <Typography component={'p'}>{description}</Typography>
  }
}
