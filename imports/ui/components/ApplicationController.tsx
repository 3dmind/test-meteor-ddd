import * as React from 'react'
import * as actions from '../actions'
import { ActionsContext } from './ApplicationActions'
import { ApplicationContainer } from './ApplicationContainer'

export const ApplicationController: React.FunctionComponent = () => (
  <ActionsContext.Provider value={actions}>
    <ApplicationContainer />
  </ActionsContext.Provider>
)
