import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { hash } from 'bcryptjs'
import { GetPetUseCase } from './get-pet-use-case'

let petsRepository: InMemoryPetRepository
let orgsRepository: InMemoryOrgRepository
let sut: GetPetUseCase

describe('Get pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    petsRepository = new InMemoryPetRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })
  it('should to be able to get pet', async () => {
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
      id: '2',
      name: 'Friend',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo, quam eum pariatur provident optio eveniet, accusantium voluptatum nostrum architecto exercitationem consequatur deserunt veritatis quae? Accusamus est fugiat eum hic!',
      age: 'puppy',
      size: 'medium',
      energy_level: '4',
      independency: '3',
      environment: 'small',
      org: {
        connect: { id: 'org-13' },
      },
    })
    const { name } = await sut.execute({
      id: '2',
    })
    expect(name).toEqual('Friend')
  })
})
