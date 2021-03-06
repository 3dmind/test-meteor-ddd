import { TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { TaskPresenter } from '../../presenter';
import { useActions } from '../TaskActions';
import { Meteor } from 'meteor/meteor';

interface ActiveTaskDescriptionProps {
  task: TaskPresenter;
  isEditing: boolean;
  onFinishEditing: () => void;
}

export const ActiveTaskDescription: React.FunctionComponent<
  ActiveTaskDescriptionProps
> = (props) => {
  const { task, isEditing, onFinishEditing } = props;
  const [text, setText] = React.useState<string>(task.description);
  const { editTaskAction } = useActions();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value);
  }

  function handleFulfilled(): void {
    console.log('edited');
  }

  function handleRejected(error: Meteor.Error): void {
    console.error(error);
  }

  function handleFinally(): void {
    onFinishEditing();
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    try {
      await editTaskAction(task, text);
      handleFulfilled();
    } catch (exception) {
      handleRejected(exception);
    } finally {
      handleFinally();
    }
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin={'none'}
          value={text}
          onChange={handleChange}
        />
      </form>
    );
  } else {
    return <Typography component={'p'}>{task.description}</Typography>;
  }
};
