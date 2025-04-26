import { FailToDeletePetError } from '@/use-cases/errors/fail-to-delete-pet-error'
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
    const org_id = request.orgId
    if (!org_id) {
      return new FailToDeletePetError()
    }
    try {
      const deletePetUseCase = makeDeletePetUseCase()
      await deletePetUseCase.execute({
        id,
        org_id,
      })
      return reply.status(200).send({})
    } catch (e) {
      if (e instanceof RegisterPetError) {
        return reply.status(409).send({ message: e.message })
      }

      throw e
    }
  }
}
