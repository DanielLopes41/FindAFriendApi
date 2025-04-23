import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '../Pet/search-pets'

export function makeSearchPetsUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const searchPetsUseCase = new SearchPetsUseCase(prismaPetRepository)

  return searchPetsUseCase
}
