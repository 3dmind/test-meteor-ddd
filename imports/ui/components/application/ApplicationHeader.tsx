import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import * as React from 'react'
import { useActions } from '../ApplicationActions'
import { AccountsUiWrapper } from './AccountsUiWrapper'

const useStyles = makeStyles(() =>
  createStyles({
    spacer: {
      flexGrow: 1,
    },
  }),
)

interface ApplicationHeaderProps {
  isAuthenticated: boolean
}

export const ApplicationHeader: React.FunctionComponent<
  ApplicationHeaderProps
> = (props) => {
  const { isAuthenticated } = props
  const { logoutAction } = useActions()
  const classes = useStyles(props)

  function handleFulfilled(): void {
    console.log('logout successful')
  }

  function handleRejected(error): void {
    console.error(error)
  }

  function handleClickLogout(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault()
    logoutAction()
      .then(handleFulfilled)
      .catch(handleRejected)
  }

  return (
    <AppBar position={'relative'}>
      <Toolbar>
        <Typography component={'h1'} variant={'h5'}>
          Domain-Driven Design with Meteor
        </Typography>
        <div className={classes.spacer} />
        <AccountsUiWrapper />
        {isAuthenticated ? (
          <Button color={'inherit'} onClick={handleClickLogout}>
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}
