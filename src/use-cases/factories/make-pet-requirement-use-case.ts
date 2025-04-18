import { PrismaRequirementPetRepository } from '@/repositories/prisma/prisma-pet-requirements-repository'
import { RegisterPetRequirementsUseCase } from '../Pet/Requirements/register-pet-requirement-use-case'

export function makePetRequirementsUseCase() {
  const prismaPetRequirementsRepository = new PrismaRequirementPetRepository()
  const authenticateUseCase = new RegisterPetRequirementsUseCase(
    prismaPetRequirementsRepository,
  )

  return authenticateUseCase
}
