import { TaskUiModel } from '../ui/TaskUiModel'

export class EditTaskDto {
  readonly taskId: string
  readonly newText: string

  constructor(task: TaskUiModel, text: string) {
    this.taskId = task.id
    this.newText = text
  }
}