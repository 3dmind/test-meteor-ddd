import { createStyles, makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { AccountsUiWrapper } from './AccountsUiWrapper'

const useStyles = makeStyles(() =>
  createStyles({
    spacer: {
      flexGrow: 1,
    },
  }),
)

export const ApplicationHeader: React.FunctionComponent = (props) => {
  const classes = useStyles(props)
  return (
    <AppBar position={'relative'}>
      <Toolbar>
        <Typography component={'h1'} variant={'h5'}>
          Domain-Driven Design with Meteor
        </Typography>
        <div className={classes.spacer} />
        <AccountsUiWrapper />
      </Toolbar>
    </AppBar>
  )
}
