import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetRequirementsUseCase } from './register-pet-requirement-use-case'
import { InMemoryPetRequirementsRepository } from '@/repositories/in-memory/in-memory-pet-requirements-repository'

let petRequirementsRepository: InMemoryPetRequirementsRepository
let sut: RegisterPetRequirementsUseCase
describe('Pet Requirements Use Case', () => {
  beforeEach(() => {
    petRequirementsRepository = new InMemoryPetRequirementsRepository()
    sut = new RegisterPetRequirementsUseCase(petRequirementsRepository)
  })
  it('should to be able to register Requirement', async () => {
    const { PetRequirements } = await sut.execute({
      pet_id: 'pet-2',
      Requirement: 'A large space and play time',
    })

    expect(PetRequirements.id).toEqual(expect.any(String))
  })
})
