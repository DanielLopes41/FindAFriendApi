import { PetRepository } from '@/repositories/pet-repository'
import { FailToDeletePetError } from '../errors/fail-to-delete-pet-error'
interface PetOrgUseCaseProps {
  id: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({ id }: PetOrgUseCaseProps): Promise<void> {
    try {
      await this.petsRepository.delete(id)
    } catch {
      throw new FailToDeletePetError()
    }
  }
}
