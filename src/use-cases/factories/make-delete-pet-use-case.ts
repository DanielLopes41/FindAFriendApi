import { DeletePetUseCase } from '../Pet/delete-pet-use-case'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeDeletePetUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const authenticateUseCase = new DeletePetUseCase(prismaPetRepository)

  return authenticateUseCase
}
