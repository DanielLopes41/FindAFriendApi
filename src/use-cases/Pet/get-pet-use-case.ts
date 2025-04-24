import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { FailToSearchPetError } from '../errors/fail-to-seach-pets-error'

interface SearchPetsUseCaseResponse {
  pet: Pet
}
export class GetPetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({ id }: { id: string }): Promise<SearchPetsUseCaseResponse> {
    try {
      if (!id) throw new FailToSearchPetError()
      const pet = await this.petsRepository.getPet({
        id,
      })
      if (!pet) throw new FailToSearchPetError()
      return { pet }
    } catch {
      throw new FailToSearchPetError()
    }
  }
}
