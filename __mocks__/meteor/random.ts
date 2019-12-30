export const Random = {
  id(): string {
    return Math.random()
      .toString(36)
      .substring(2)
  },
}
