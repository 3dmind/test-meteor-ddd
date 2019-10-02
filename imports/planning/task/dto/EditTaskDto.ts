export class EditTaskDto {
  readonly taskId: string
  readonly newText: string

  constructor(taskId: string, text: string) {
    this.taskId = taskId
    this.newText = text
  }
}
