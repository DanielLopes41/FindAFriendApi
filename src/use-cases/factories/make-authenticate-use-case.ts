import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '../Org/authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgRepository)

  return authenticateUseCase
}
