import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { OrgAlredyExistsError } from '../errors/org-alredy-exists-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { RegisterOrgUseCase } from './register'

let orgsRepository: InMemoryOrgRepository
let sut: RegisterOrgUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })
  it('should not be able to register with same E-mail twice', async () => {
    await sut.execute({
      address: 'Rj',
      cep: '22222222231',
      email: 'jonhdoe@email.com',
      manager: 'Jonh Doe',
      password: '123456',
      whatsapp: '219999922222222',
      city: 'Rio de Janeiro',
      state: 'Rj',
    })
    await expect(async () => {
      await sut.execute({
        address: 'Rj',
        cep: '22222222231',
        email: 'jonhdoe@email.com',
        manager: 'Jonh Doe',
        password: '123456',
        whatsapp: '219999922222222',
        city: 'Rio de Janeiro',
        state: 'Rj',
      })
    }).rejects.toBeInstanceOf(OrgAlredyExistsError)
  })
  it('should to be able to register', async () => {
    const { org } = await sut.execute({
      address: 'Rj',
      cep: '22222222231',
      email: 'jonhdoe@email.com',
      manager: 'Jonh Doe',
      password: '123456',
      whatsapp: '219999922222222',
      city: 'Rio de Janeiro',
      state: 'Rj',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should to be possible hash password', async () => {
    const { org } = await sut.execute({
      address: 'Rj',
      cep: '22222222231',
      email: 'jonhdoe@email.com',
      manager: 'Jonh Doe',
      password: '123456',
      whatsapp: '219999922222222',
      city: 'Rio de Janeiro',
      state: 'Rj',
    })
    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
