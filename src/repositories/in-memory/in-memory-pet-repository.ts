import { Prisma, Pet } from '@prisma/client'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetCreateInput) {
    const pet: Pet = {
      id: 'pet-123',
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency: data.independency,
      environment: data.environment,
      created_at: new Date(),
      updated_at: new Date(),
      org_id: '123',
    }
    this.items.push(pet)
    return pet
  }
}
