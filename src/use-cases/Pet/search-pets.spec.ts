import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetRepository
let orgsRepository: InMemoryOrgRepository
let sut: SearchPetsUseCase

describe('Search pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    petsRepository = new InMemoryPetRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })
  it('should to be able to find pets in the same city', async () => {
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
    await orgsRepository.create({
      address: 'rj',
      id: 'org-13',
      cep: '2123213213',
      email: 'jonhdoe1@email.com',
      manager: 'jonh',
      password_hash: await hash('123456', 6),
      whatsapp: '123213213',
      city: 'São Paulo',
      state: 'Rj',
    })
    for (let i = 4; i > 0; i--) {
      await petsRepository.create({
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
    }
    await petsRepository.create({
      name: 'Buddy',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo, quam eum pariatur provident optio eveniet, accusantium voluptatum nostrum architecto exercitationem consequatur deserunt veritatis quae? Accusamus est fugiat eum hic!',
      age: 'puppy',
      size: 'medium',
      energy_level: '3',
      independency: '3',
      environment: 'small',
      org: {
        connect: { id: 'org-13' },
      },
    })
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
    })
    expect(pets.length).toEqual(4)
  })
  it('should to be able to find pets by params', async () => {
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
    for (let i = 4; i > 0; i--) {
      await petsRepository.create({
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
    }
    await petsRepository.create({
      name: 'Buddy',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo, quam eum pariatur provident optio eveniet, accusantium voluptatum nostrum architecto exercitationem consequatur deserunt veritatis quae? Accusamus est fugiat eum hic!',
      age: 'puppy',
      size: 'medium',
      energy_level: '3',
      independency: '3',
      environment: 'large',
      org: {
        connect: { id: 'org-123' },
      },
    })
    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      environment: 'large',
    })
    expect(pets.length).toEqual(1)
  })
})
