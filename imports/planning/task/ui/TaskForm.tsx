import * as React from 'react'
import { useActions } from './TaskActions'

export const TaskForm: React.FunctionComponent = () => {
  const [description, setDescription] = React.useState<string>('')
  const { noteTaskAction } = useActions()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value)
  }

  function handleFulfilled(): void {
    console.log('noted')
  }

  function handleRejected(error): void {
    console.error(error)
  }

  function handleFinally(): void {
    setDescription('')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    noteTaskAction(description)
      .then(handleFulfilled)
      .catch(handleRejected)
      .finally(handleFinally)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>What needs to be done?</legend>
        <label htmlFor={'description'}>
          <input
            id={'description'}
            type={'text'}
            name={'description'}
            value={description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </form>
  )
}
