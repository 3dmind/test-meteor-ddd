import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

export const ApplicationHeader: React.FunctionComponent = () => {
  return (
    <AppBar position={'relative'}>
      <Toolbar>
        <Typography component={'h1'} variant={'h5'}>
          Domain-Driven Design with Meteor
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
