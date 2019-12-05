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
import { useHistory } from 'react-router-dom'
import { useActions } from '../ApplicationActions'

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3),
    },
  }),
)

export const ChangePassword: React.FunctionComponent = (props) => {
  const history = useHistory()
  const { changePasswordAction } = useActions()
  const [oldPassword, setOldPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [newRepeatedPassword, setNewRepeatedPassword] = React.useState<string>(
    '',
  )

  function handleChangeOldPassword(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setOldPassword(event.target.value)
  }

  function handleChangePassword(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setNewPassword(event.target.value)
  }

  function handleChangeRepeatedPassword(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setNewRepeatedPassword(event.target.value)
  }

  function handleFulfilled(): void {
    console.log('Change password successful')
    history.push('/')
  }

  function handleRejected(error): void {
    console.error(error)
    setOldPassword('')
    setNewPassword('')
    setNewRepeatedPassword('')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    changePasswordAction({
      newPassword,
      oldPassword,
    })
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
              Change password
            </Typography>
          </Grid>
          <Grid item>
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant={'outlined'}
                    name={'oldPassword'}
                    label={'Password'}
                    type={'password'}
                    value={oldPassword}
                    onChange={handleChangeOldPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant={'outlined'}
                    name={'newPassword'}
                    label={'New Password'}
                    type={'password'}
                    value={newPassword}
                    onChange={handleChangePassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant={'outlined'}
                    name={'newRepeatedPassword'}
                    label={'New Password (again)'}
                    type={'password'}
                    value={newRepeatedPassword}
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
                    Change password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
