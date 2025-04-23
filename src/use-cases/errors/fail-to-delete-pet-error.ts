export class FailToDeletePetError extends Error {
  constructor() {
    super('Do not to be able to delete pet')
  }
}
