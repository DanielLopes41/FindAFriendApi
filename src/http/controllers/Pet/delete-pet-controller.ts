import { RegisterPetError } from '@/use-cases/errors/register-pet-error'
import { makeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeletePetController {
  async delete(request: FastifyRequest, reply: FastifyReply) {
    const petSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = petSchema.parse(request.params)
    try {
      const deletePetUseCase = makeDeletePetUseCase()
      await deletePetUseCase.execute({
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
