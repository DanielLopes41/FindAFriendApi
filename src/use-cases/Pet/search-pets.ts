import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { FailToSearchPetError } from '../errors/fail-to-seach-pets-error'

interface SearchPetsUseCaseProps {
  city: string
  page?: number
  age?: string
  size?: string
  energy_level?: string
  independency?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    page,
    age,
    energy_level,
    environment,
    independency,
    size,
    city,
  }: SearchPetsUseCaseProps): Promise<SearchPetsUseCaseResponse> {
    try {
      if (!city) throw new FailToSearchPetError()

      const pets = await this.petsRepository.searchMany({
        city,
        age,
        size,
        energy_level,
        independency,
        environment,
        page,
      })

      return { pets }
    } catch (e) {
      if (e instanceof FailToSearchPetError) {
        throw e
      }
      throw e
    }
  }
}
