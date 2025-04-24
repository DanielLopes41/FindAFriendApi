import { PetRepository } from '@/repositories/pet-repository'
import { FailToDeletePetError } from '../errors/fail-to-delete-pet-error'
interface PetOrgUseCaseProps {
  id: string
  org_id: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({ id, org_id }: PetOrgUseCaseProps): Promise<void> {
    try {
      await this.petsRepository.delete({ id, org_id })
    } catch {
      throw new FailToDeletePetError()
    }
  }
}
