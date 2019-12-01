export interface TaskDocument {
  _id?: string
  ownerId: string
  description: string
  createdAt?: Date
  editedAt?: Date
  isTickedOff: boolean
  tickedOffAt?: Date
  resumedAt?: Date
  isDiscarded: boolean
  discardedAt?: Date
  isArchived: boolean
  archivedAt?: Date
}
