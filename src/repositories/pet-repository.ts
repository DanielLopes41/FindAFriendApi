import { Pet, Prisma } from '@prisma/client'
export interface SimplePetCreateInput {
  name: string
  description: string
  age: string
  size: string
  energy_level: string
  independency: string
  environment: string
  org_id: string
}
export interface PetRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet>
  searchMany(params: {
    city: string
    age?: string
    size?: string
    energy_level?: string
    independency?: string
    environment?: string
    page?: number
  }): Promise<Pet[]>
  delete(params: { id: string; org_id: string }): Promise<void>
  getPet({ id }: { id: string }): Promise<
    | {
        name: string
        description: string
        age: string
        size: string
        energy_level: string
        independency: string
        environment: string
        requirements: string[]
      }
    | undefined
    | null
  >
}
