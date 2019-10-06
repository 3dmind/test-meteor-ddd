import { TaskUiModel } from '../ui/TaskUiModel'

export class DiscardArchivedTasksDto {
  readonly taskIdList: string[]

  constructor(tasks: TaskUiModel[]) {
    this.taskIdList = tasks.map((task) => task.id)
  }
}
