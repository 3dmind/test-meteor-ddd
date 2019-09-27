import { ValueObject } from '../../../core/domain/ValueObject'
import { TaskValidators } from './TaskValidators'

interface TaskDescriptionProps {
  value: string
}

export class TaskDescription extends ValueObject<TaskDescriptionProps> {
  private constructor(props: TaskDescriptionProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  public static create(text: string): TaskDescription {
    if (TaskValidators.isValidTaskDescription(text)) {
      return new TaskDescription({ value: text })
    }
  }
}
