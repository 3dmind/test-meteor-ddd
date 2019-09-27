import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from '../imports/ui/App'

Meteor.startup(function onStartUp() {
  ReactDOM.render(<App />, document.querySelector('#app'))
})
