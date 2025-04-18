import { PetRequirement, Prisma } from '@prisma/client'
import { PetRequirementsRepository } from '../pet-requirements-repository'

export class InMemoryPetRequirementsRepository
  implements PetRequirementsRepository
{
  public items: PetRequirement[] = []
  async create(data: Prisma.PetRequirementCreateInput) {
    const PetRequirement: PetRequirement = {
      id: 'Requirements-123',
      pet_id: '123',
      Requirement: data.Requirement,
    }
    this.items.push(PetRequirement)
    return PetRequirement
  }
}
