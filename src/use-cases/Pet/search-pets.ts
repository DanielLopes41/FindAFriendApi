import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { RegisterPetError } from '../errors/register-pet-error'
interface SearchPetsUseCaseProps {
  query: string
  page: number
}
interface SearchPetsUseCaseResponse {
  pet: Pet
}
export class RegisterPetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    age,
    description,
    energy_level,
    environment,
    independency,
    name,
    org_id,
    size,
  }: SearchPetsUseCaseProps): Promise<PetUseCaseResponse> {
    try {
      const pet = await this.petsRepository.create({
        name,
        description,
        age,
        size,
        energy_level,
        independency,
        environment,
        org: {
          connect: {
            id: org_id,
          },
        },
      })

      return { pet }
    } catch {
      throw new RegisterPetError()
    }
  }
}
