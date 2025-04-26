import { PetRepository } from '@/repositories/pet-repository'
import { FailToSearchPetError } from '../errors/fail-to-seach-pets-error'

interface SearchPetsUseCaseResponse {
  name: string
  description: string
  age: string
  size: string
  energy_level: string
  independency: string
  environment: string
  requirements: string[]
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
      const {
        age,
        description,
        energy_level,
        environment,
        independency,
        name,
        requirements,
        size,
      } = pet
      if (!pet) throw new FailToSearchPetError()
      return {
        age,
        description,
        energy_level,
        environment,
        independency,
        name,
        requirements,
        size,
      }
    } catch {
      throw new FailToSearchPetError()
    }
  }
}
