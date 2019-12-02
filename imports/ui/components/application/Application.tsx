import * as React from 'react'
import { TaskController } from '../../../planning/task/ui'
import { ApplicationPresenter } from '../../presenter'
import { ApplicationContent } from './ApplicationContent'
import { ApplicationHeader } from './ApplicationHeader'
import { Switch, Route } from 'react-router-dom'
import { SignIn } from './SignIn'

interface ApplicationProps {
  application: ApplicationPresenter
}

export const Application: React.FunctionComponent<ApplicationProps> = (
  props,
) => {
  const { application } = props
  return (
    <>
      <ApplicationHeader isAuthenticated={application.isAuthenticated()} />
      <Switch>
        <Route exact path={'/'}>
          <ApplicationContent>
            <TaskController />
          </ApplicationContent>
        </Route>
        <Route path={'/login'}>
          <SignIn />
        </Route>
      </Switch>
    </>
  )
}
