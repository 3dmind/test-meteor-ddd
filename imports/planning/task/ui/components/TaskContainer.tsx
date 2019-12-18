import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import * as React from 'react'
import { Publications } from '../../api'
import { ActiveTasksContainer } from './ActiveTasks'
import { ArchivedTasksContainer } from './ArchivedTasks'
import { Loader } from './common'
import { NoteTask } from './NoteTask'

export const TaskContainer: React.FunctionComponent = () => {
  const isLoading = useTracker(function subscribe() {
    const handle = Meteor.subscribe(Publications.Tasks)
    return !handle.ready()
  }, [])

  return (
    <>
      <NoteTask />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ActiveTasksContainer />
          <ArchivedTasksContainer />
        </>
      )}
    </>
  )
}
