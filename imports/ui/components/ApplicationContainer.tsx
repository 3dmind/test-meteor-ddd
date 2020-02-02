import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { UserPresenterMapper } from '../mappers';
import { Application } from './Application';

export const ApplicationContainer = withTracker(() => {
  const user = UserPresenterMapper.toPresentation(Meteor.user());
  return {
    user,
  };
})(Application);
