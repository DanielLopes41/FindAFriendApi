export class FailToSearchPetError extends Error {
  constructor() {
    super('Do not to be able to find a pet')
  }
}
