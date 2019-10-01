import { Paper, TextField } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import * as React from 'react'
import { useActions } from './TaskActions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
  }),
)

export const NoteTask: React.FunctionComponent = (props) => {
  const [text, setText] = React.useState<string>('')
  const { noteTaskAction } = useActions()
  const classes = useStyles(props)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value)
  }

  function handleFulfilled(): void {
    console.log('noted')
  }

  function handleRejected(error): void {
    console.error(error)
  }

  function handleFinally(): void {
    setText('')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    noteTaskAction(text)
      .then(handleFulfilled)
      .catch(handleRejected)
      .finally(handleFinally)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root} elevation={2}>
        <TextField
          fullWidth
          placeholder={'What needs to be done?'}
          margin={'none'}
          variant={'outlined'}
          value={text}
          onChange={handleChange}
        />
      </Paper>
    </form>
  )
}
