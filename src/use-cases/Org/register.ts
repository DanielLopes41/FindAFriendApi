import { OrgRepository } from '@/repositories/org-repository'
import bcrypt from 'bcryptjs'
import { OrgAlredyExistsError } from '../errors/org-alredy-exists-error'
import { Org } from '@prisma/client'
interface RegisterOrgUseCaseProps {
  address: string
  cep: string
  email: string
  password: string
  whatsapp: string
  manager: string
  city: string
  state: string
}
interface RegisterUseCaseResponse {
  org: Org
}
export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgRepository) {}

  async execute({
    address,
    cep,
    email,
    manager,
    password,
    whatsapp,
    city,
    state,
  }: RegisterOrgUseCaseProps): Promise<RegisterUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)
    const orgWithSameEmail = await this.orgsRepository.findOrgByEmail(email)
    if (orgWithSameEmail) {
      throw new OrgAlredyExistsError()
    }
    const org = await this.orgsRepository.create({
      address,
      cep,
      email,
      manager,
      password_hash,
      whatsapp,
      city,
      state,
    })

    return { org }
  }
}
