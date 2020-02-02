interface TaskProps {
  id: string;
  description: string;
  createdAt: Date;
  isTickedOff: boolean;
  tickedOffAt?: Date;
  isArchived: boolean;
  archivedAt?: Date;
}

export class TaskPresenter {
  static dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  private readonly props: TaskProps;

  private constructor(props: TaskProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get description(): string {
    return this.props.description;
  }

  get createdAtFormatted(): string {
    return TaskPresenter.dateFormatter.format(this.props.createdAt);
  }

  get isTickedOff(): boolean {
    return this.props.isTickedOff;
  }

  get tickedOffAtFormatted(): string {
    const { tickedOffAt, isTickedOff } = this.props;
    if (!isTickedOff) {
      return '';
    }
    return TaskPresenter.dateFormatter.format(tickedOffAt);
  }

  get isArchived(): boolean {
    return this.props.isArchived;
  }

  get archivedAtFormatted(): string {
    const { archivedAt, isArchived } = this.props;
    if (!isArchived) {
      return '';
    }
    return TaskPresenter.dateFormatter.format(archivedAt);
  }

  static create(props: TaskProps): TaskPresenter {
    return new TaskPresenter(props);
  }
}
