import { OrgAlredyExistsError } from '@/use-cases/errors/org-alredy-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { findCityAndStateByCep } from '@/utils/findCityAndStateByCep'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class OrgRegisterController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const orgSchema = z.object({
      email: z.string().email(),
      manager: z.string(),
      cep: z.string(),
      address: z.string(),
      whatsapp: z.string(),
      password: z.string().min(6),
    })
    const { email, address, cep, manager, password, whatsapp } =
      orgSchema.parse(request.body)

    const { state, city } = await findCityAndStateByCep(cep)
    try {
      const registerOrgUseCase = makeRegisterUseCase()
      await registerOrgUseCase.execute({
        email,
        address,
        cep,
        manager,
        password,
        whatsapp,
        state,
        city,
      })
      return reply
        .status(201)
        .send({ message: 'Organização registrada com sucesso.' })
    } catch (e) {
      if (e instanceof OrgAlredyExistsError) {
        return reply.status(409).send({ message: e.message })
      }

      throw e
    }
  }
}
