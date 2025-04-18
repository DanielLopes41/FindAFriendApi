import { prisma } from '@/lib/Prisma'
import { Prisma } from '@prisma/client'

import { PetRequirementsRepository } from '../pet-requirements-repository'
export class PrismaRequirementPetRepository
  implements PetRequirementsRepository
{
  async create(data: Prisma.PetRequirementCreateInput) {
    const petRequirement = await prisma.petRequirement.create({
      data,
    })

    return petRequirement
  }
}
