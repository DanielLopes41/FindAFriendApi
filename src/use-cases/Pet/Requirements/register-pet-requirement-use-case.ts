import { PetRequirementsRepository } from '@/repositories/pet-requirements-repository'
import { FailToRegisterRequirementError } from '@/use-cases/errors/fail-to-register-requirement-error'
import { PetRequirement } from '@prisma/client'

interface PetRequirementsUseCaseProps {
  Requirement: string
  pet_id: string
}
interface PetRequirementsUseCaseResponse {
  PetRequirements: PetRequirement
}
export class RegisterPetRequirementsUseCase {
  constructor(
    private prismaPetsRequirementsRepository: PetRequirementsRepository,
  ) {}

  async execute({
    Requirement,
    pet_id,
  }: PetRequirementsUseCaseProps): Promise<PetRequirementsUseCaseResponse> {
    try {
      const PetRequirements =
        await this.prismaPetsRequirementsRepository.create({
          Requirement,
          pet: {
            connect: {
              id: pet_id,
            },
          },
        })

      return { PetRequirements }
    } catch {
      throw new FailToRegisterRequirementError()
    }
  }
}
