import { RegisterPetError } from '@/use-cases/errors/register-pet-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class GetPetController {
  async getPet(request: FastifyRequest, reply: FastifyReply) {
    const petSchema = z.object({
      id: z.string(),
    })
    const { id } = petSchema.parse(request.params)
    try {
      const getPetUseCase = makeGetPetUseCase()
      await getPetUseCase.execute({
        id,
      })
      return reply.status(201)
    } catch (e) {
      if (e instanceof RegisterPetError) {
        return reply.status(409).send({ message: e.message })
      }
      throw e
    }
  }
}
