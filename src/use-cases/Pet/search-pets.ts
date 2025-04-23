import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { RegisterPetError } from '../errors/register-pet-error'
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
    } catch {
      throw new RegisterPetError()
    }
  }
}
