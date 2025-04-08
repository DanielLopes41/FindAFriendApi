import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { RegisterPetError } from '../errors/register-pet-error'
interface PetOrgUseCaseProps {
  name: string
  description: string
  age: string
  size: string
  energy_level: string
  independency: string
  environment: string
  org_id: string
}
interface PetUseCaseResponse {
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
  }: PetOrgUseCaseProps): Promise<PetUseCaseResponse> {
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
