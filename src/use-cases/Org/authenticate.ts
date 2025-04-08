import { OrgRepository } from '@/repositories/org-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  org: Org
}
export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findOrgByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
