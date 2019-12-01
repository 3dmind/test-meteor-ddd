import { CssBaseline } from '@material-ui/core'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import '../imports/startup/client/accounts.config'
import { ApplicationController } from '../imports/ui'

Meteor.startup(function onStartUp() {
  ReactDOM.render(
    <>
      <CssBaseline />
      <ApplicationController />
    </>,
    document.querySelector('#app'),
  )
})
