import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { RegisterPetUseCase } from '../Pet/register-pet-use-case'

export function makeRegisterPetUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const registerPetUseCase = new RegisterPetUseCase(prismaPetRepository)

  return registerPetUseCase
}
