import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { ApplicationPresenterMapper } from '../mappers'
import { Application } from './Application'

export const ApplicationContainer = withTracker(() => {
  const application = ApplicationPresenterMapper.toPresentation(Meteor.user())
  return {
    application,
  }
})(Application)
