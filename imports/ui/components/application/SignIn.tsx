import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useActions } from '../ApplicationActions'

export const SignIn: React.FunctionComponent = () => {
  const history = useHistory()
  const { signInAction } = useActions()
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  function handleChangeUsername(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setUsername(event.target.value)
  }

  function handleChangePassword(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setPassword(event.target.value)
  }

  function handleFulfilled(): void {
    console.log('Sign in successful')
    history.push('/')
  }

  function handleRejected(error): void {
    console.error(error)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    signInAction({ username, password })
      .then(handleFulfilled)
      .catch(handleRejected)
  }

  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Typography component={'h1'} variant={'h5'}>
        Login
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant={'outlined'}
              name={'username'}
              label={'Username'}
              value={username}
              onChange={handleChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant={'outlined'}
              name={'password'}
              label={'Password'}
              type={'password'}
              value={password}
              onChange={handleChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type={'submit'}
              variant={'contained'}
              color={'primary'}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
