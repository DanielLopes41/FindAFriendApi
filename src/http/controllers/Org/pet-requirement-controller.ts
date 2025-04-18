import { FailToRegisterRequirementError } from '@/use-cases/errors/fail-to-register-requirement-error'
import { makePetRequirementsUseCase } from '@/use-cases/factories/make-pet-requirement-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class PetRequirementController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const orgSchema = z.object({
      pet_id: z.string(),
      Requirement: z.string().min(20),
    })
    const { pet_id, Requirement } = orgSchema.parse(request.body)
    try {
      const petRequirementUseCase = makePetRequirementsUseCase()
      await petRequirementUseCase.execute({
        pet_id,
        Requirement,
      })
      return reply.status(200).send()
    } catch (e) {
      if (e instanceof FailToRegisterRequirementError) {
        return reply.status(400).send({ message: e.message })
      }

      throw e
    }
  }
}
