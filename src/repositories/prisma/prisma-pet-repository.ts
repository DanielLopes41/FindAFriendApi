import { prisma } from '@/lib/Prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
export class PrismaPetRepository implements PetRepository {
  async delete(id: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id,
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
      city: string
      size?: string
      energy_level?: string
      independency?: string
      environment?: string
    } = { city }

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
