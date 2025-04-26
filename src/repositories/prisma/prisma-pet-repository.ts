import { prisma } from '@/lib/Prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
export class PrismaPetRepository implements PetRepository {
  async getPet({ id }: { id: string }) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        requirements: true,
      },
    })
    if (!pet) {
      throw new Error('Pet not found')
    }

    const {
      name,
      description,
      age,
      size,
      energy_level,
      independency,
      environment,
    } = pet

    return {
      name,
      description,
      age,
      size,
      energy_level,
      independency,
      environment,
      requirements: pet.requirements.map((req) => req.Requirement),
    }
  }

  async delete({ id, org_id }: { id: string; org_id: string }): Promise<void> {
    await prisma.pet.deleteMany({
      where: {
        id,
        org_id,
      },
    })
  }

  async searchMany(params: {
    city: string
    age?: string
    size?: string
    energy_level?: string
    independency?: string
    environment?: string
    page?: number
  }): Promise<Pet[]> {
    const {
      city,
      age,
      size,
      energy_level,
      independency,
      environment,
      page = 1,
    } = params

    const filters: {
      age?: string
      size?: string
      energy_level?: string
      independency?: string
      environment?: string
      org?: { city: string }
    } = {}
    if (city) filters.org = { city }
    if (age) filters.age = age
    if (size) filters.size = size
    if (energy_level) filters.energy_level = energy_level
    if (independency) filters.independency = independency
    if (environment) filters.environment = environment

    const pets = await prisma.pet.findMany({
      where: filters,
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
