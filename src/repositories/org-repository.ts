import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findOrgByEmail(email: string): Promise<Org | null>
  fetchOrgsByCity(city: string): Promise<Org[] | null>
}
