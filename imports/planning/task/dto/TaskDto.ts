import { TaskUiModel } from '../ui/TaskUiModel'

export class TaskDto {
  readonly taskId

  constructor(task: TaskUiModel) {
    this.taskId = task.taskId
  }
}
