import { prisma } from '@/lib/Prisma'
import { Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
export class PrismaOrgRepository implements OrgRepository {
  async fetchOrgsByCity(city: string) {
    const org = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findOrgByEmail(email: string) {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    })
    return org
  }
}
