import { PrismaOrgRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../Org/register'

export function makeRegisterUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(prismaOrgRepository)

  return registerOrgUseCase
}
