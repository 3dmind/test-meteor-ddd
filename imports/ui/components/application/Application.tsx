import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TaskController } from '../../../planning/task/ui'
import { ApplicationPresenter } from '../../presenter'
import { ApplicationContent } from './ApplicationContent'
import { ApplicationHeader } from './ApplicationHeader'
import { ChangePassword } from './ChangePassword'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

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
          {application.isAuthenticated() ? (
            <ApplicationContent>
              <TaskController />
            </ApplicationContent>
          ) : (
            <SignIn />
          )}
        </Route>
        <Route path={'/signin'}>
          <SignIn />
        </Route>
        <Route path={'/signup'}>
          <SignUp />
        </Route>
        <Route path={'/changepassword'}>
          <ChangePassword />
        </Route>
      </Switch>
    </>
  )
}
