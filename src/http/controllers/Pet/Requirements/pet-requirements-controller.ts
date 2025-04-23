import { RegisterPetError } from '@/use-cases/errors/register-pet-error'
import { makePetRequirementsUseCase } from '@/use-cases/factories/make-pet-requirement-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class PetRegisterController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const orgSchema = z.object({
      Requirement: z.string().min(10),
      pet_id: z.string(),
    })
    const { Requirement, pet_id } = orgSchema.parse(request.body)
    try {
      const registerPetRequirementsUseCase = makePetRequirementsUseCase()
      await registerPetRequirementsUseCase.execute({
        pet_id,
        Requirement,
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
