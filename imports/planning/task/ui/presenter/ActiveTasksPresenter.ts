import { TaskPresenter } from './TaskPresenter';

interface ActiveTasksProps {
  tasks: TaskPresenter[];
  count: number;
  tickedOffTasksCount: number;
}

export class ActiveTasksPresenter {
  private props: ActiveTasksProps;

  private constructor(props: ActiveTasksProps) {
    this.props = props;
  }

  get progress(): number {
    return (this.props.tickedOffTasksCount * 100) / this.props.count;
  }

  static create(props: ActiveTasksProps): ActiveTasksPresenter {
    return new ActiveTasksPresenter(props);
  }

  hasTasks(): boolean {
    return this.props.count > 0;
  }

  allTasks(): TaskPresenter[] {
    return this.props.tasks;
  }

  withoutTickedOffTasks(): TaskPresenter[] {
    return this.props.tasks.filter((task) => !task.isTickedOff);
  }
}
