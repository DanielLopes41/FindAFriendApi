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
    city: string;
    age?: string;
    size?: string;
    energy_level?: string;
    independency?: string;
    environment?: string;
    page?: number;
  }): Promise<Pet[]>
}
