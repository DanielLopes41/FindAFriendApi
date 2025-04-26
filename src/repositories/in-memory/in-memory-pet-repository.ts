import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { InMemoryOrgRepository } from './in-memory-org-repository'
import { randomUUID } from 'crypto'

export interface findPets {
  name: string
  description: string
  age: string
  size: string
  energy_level: string
  independency: string
  environment: string
  city: string
}

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  constructor(private orgsRepository?: InMemoryOrgRepository) {}
  async getPet({ id }: { id: string }) {
    const pet = await this.items.find((item) => id === item.id)
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
      requirements: [],
    }
  }

  async delete({ id, org_id }: { id: string; org_id: string }) {
    const itemIndex = await this.items.findIndex(
      (item) => id === item.id && org_id === item.org_id,
    )

    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1)
    }
  }

  async searchMany({
    age,
    city,
    size,
    energy_level,
    independency,
    environment,
    page = 1,
  }: {
    age?: string
    city: string
    size?: string
    energy_level?: string
    independency?: string
    environment?: string
    page?: number
  }) {
    const orgsByCity = (await this.orgsRepository?.fetchOrgsByCity(city)) ?? []

    return this.items
      .filter((pet) =>
        orgsByCity.some(
          (org) =>
            org.id === pet.org_id &&
            (!age || pet.age === age) &&
            (!size || pet.size === size) &&
            (!energy_level || pet.energy_level === energy_level) &&
            (!independency || pet.independency === independency) &&
            (!environment || pet.environment === environment),
        ),
      )
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PetCreateInput) {
    let org_id = 'default-org-id'

    if (data.org && typeof data.org === 'object' && 'connect' in data.org) {
      const connect = data.org.connect as { id: string }
      org_id = connect.id
    }

    const pet: Pet = {
      id: data.id || randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency: data.independency,
      environment: data.environment,
      created_at: new Date(),
      updated_at: new Date(),
      org_id,
    }
    this.items.push(pet)
    return pet
  }
}
