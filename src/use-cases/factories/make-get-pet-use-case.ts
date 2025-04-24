import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetUseCase } from '../Pet/get-pet-use-case'

export function makeGetPetUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const getPetUseCase = new GetPetUseCase(prismaPetRepository)

  return getPetUseCase
}
