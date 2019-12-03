import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useActions } from '../ApplicationActions'

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3),
    },
  }),
)

export const SignUp: React.FunctionComponent = (props) => {
  const history = useHistory()
  const { signUpAction } = useActions()
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [repeatedPassword, setRepeatedPassword] = React.useState<string>('')

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

  function handleChangeRepeatedPassword(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setRepeatedPassword(event.target.value)
  }

  function handleFulfilled(): void {
    console.log('Sign up successful')
    history.push('/')
  }

  function handleRejected(error): void {
    console.error(error)
    setPassword('')
    setRepeatedPassword('')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    signUpAction({ username, password })
      .then(handleFulfilled)
      .catch(handleRejected)
  }

  const classes = useStyles(props)
  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Paper elevation={5} className={classes.paper}>
        <Grid container spacing={2} direction={'column'}>
          <Grid item>
            <Typography component={'h1'} variant={'h5'} align={'center'}>
              Create account
            </Typography>
          </Grid>
          <Grid item>
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
                  <TextField
                    fullWidth
                    variant={'outlined'}
                    name={'repeatedPassword'}
                    label={'Password (again)'}
                    type={'password'}
                    value={repeatedPassword}
                    onChange={handleChangeRepeatedPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            <Typography component={'p'} align={'right'}>
              <Link to={'/signin'}>Already have an account? Sign in</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
