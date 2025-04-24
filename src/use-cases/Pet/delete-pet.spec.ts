import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { DeletePetUseCase } from './delete-pet-use-case'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetRepository
let orgsRepository: InMemoryOrgRepository
let sut: DeletePetUseCase

describe('Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    petsRepository = new InMemoryPetRepository(orgsRepository)
    sut = new DeletePetUseCase(petsRepository)
  })
  it('should to be able to delete', async () => {
    await orgsRepository.create({
      address: 'rj',
      id: 'org-123',
      cep: '2123213213',
      email: 'jonhdoe@email.com',
      manager: 'jonh',
      password_hash: await hash('123456', 6),
      whatsapp: '123213213',
      city: 'Rio de Janeiro',
      state: 'Rj',
    })
    await petsRepository.create({
      id: '1',
      name: 'Buddy',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo, quam eum pariatur provident optio eveniet, accusantium voluptatum nostrum architecto exercitationem consequatur deserunt veritatis quae? Accusamus est fugiat eum hic!',
      age: 'puppy',
      size: 'medium',
      energy_level: '4',
      independency: '3',
      environment: 'small',
      org: {
        connect: { id: 'org-123' },
      },
    })
    const pets = await petsRepository.searchMany({
      city: 'Rio de Janeiro',
    })
    expect(pets.length).toEqual(1)
    await sut.execute({
      id: '1',
      org_id: 'org-123',
    })
    const petsAfter = await petsRepository.searchMany({
      city: 'Rio de Janeiro',
    })
    expect(petsAfter.length).toEqual(0)
  })
})
