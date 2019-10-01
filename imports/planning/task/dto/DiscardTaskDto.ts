export class DiscardTaskDto {
  readonly taskId: string

  constructor(taskId: string) {
    this.taskId = taskId
  }
}
