import { CssBaseline } from '@material-ui/core'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Application } from '../imports/ui/Application'

Meteor.startup(function onStartUp() {
  ReactDOM.render(
    <>
      <CssBaseline />
      <Application />
    </>,
    document.querySelector('#app'),
  )
})
