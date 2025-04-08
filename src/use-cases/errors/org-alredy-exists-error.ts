export class OrgAlredyExistsError extends Error {
  constructor() {
    super('E-mail alredy exists.')
  }
}
