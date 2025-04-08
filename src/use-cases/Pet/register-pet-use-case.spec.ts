import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'

let petsRepository: InMemoryPetRepository
let sut: RegisterPetUseCase

describe('Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })
  it('should to be able to register', async () => {
    const { pet } = await sut.execute({
      name: 'Buddy',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo, quam eum pariatur provident optio eveniet, accusantium voluptatum nostrum architecto exercitationem consequatur deserunt veritatis quae? Accusamus est fugiat eum hic!',
      age: 'puppy',
      size: 'medium',
      energy_level: '4',
      independency: '3',
      environment: 'small',
      org_id: 'org-123',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
