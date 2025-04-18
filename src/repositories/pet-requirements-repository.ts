import { PetRequirement, Prisma } from '@prisma/client'

export interface PetRequirementsRepository {
  create(data: Prisma.PetRequirementCreateInput): Promise<PetRequirement>
}
