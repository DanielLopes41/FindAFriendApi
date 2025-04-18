import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'

let orgsRepository: InMemoryOrgRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })
  it('should to be able to authenticate', async () => {
    await orgsRepository.create({
      address: 'rj',
      cep: '2123213213',
      email: 'jonhdoe@email.com',
      manager: 'jonh',
      password_hash: await hash('123456', 6),
      whatsapp: '123213213',
      city: 'Rio de Janeiro',
      state: 'Rj',
    })
    const { org } = await sut.execute({
      email: 'jonhdoe@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not to be able to authenticate with wrong Email', async () => {
    await expect(
      sut.execute({
        email: 'teste@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not to be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      address: 'rj',
      cep: '2123213213',
      email: 'jonhdoe@email.com',
      manager: 'jonh',
      password_hash: await hash('123456', 6),
      whatsapp: '123213213',
      city: 'Rio de Janeiro',
      state: 'Rj',
    })
    await expect(
      sut.execute({
        email: 'teste@email.com',
        password: '12345641',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
