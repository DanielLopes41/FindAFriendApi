import { Prisma, Org } from '@prisma/client'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []

  async fetchOrgsByCity(city: string): Promise<Org[] | null> {
    const orgs = this.items.filter((org) => org.city === city)

    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id || '123',
      email: data.email,
      manager: data.manager,
      address: data.address,
      cep: data.cep,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      city: data.city,
      state: data.state,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.items.push(org)
    return org
  }

  async findOrgByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }
    return org
  }
}
