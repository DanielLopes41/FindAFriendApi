import { RegisterPetError } from '@/use-cases/errors/register-pet-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case copy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class PetRegisterController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const orgSchema = z.object({
      name: z.string().min(3),
      description: z.string().min(20),
      age: z.enum(['puppy', 'adult', 'elderly']),
      size: z.enum(['small', 'medium', 'large']),
      energy_level: z.enum(['1', '2', '3', '4', '5']),
      independency: z.enum(['1', '2', '3', '4', '5']),
      environment: z.enum(['small', 'medium', 'large']),
    })

    const {
      name,
      description,
      age,
      size,
      energy_level,
      independency,
      environment,
    } = orgSchema.parse(request.body)
    const org_id = request.orgId!
    try {
      const registerPetUseCase = makeRegisterPetUseCase()
      await registerPetUseCase.execute({
        name,
        description,
        age,
        size,
        energy_level,
        independency,
        org_id,
        environment,
      })
      return reply.status(201).send({
        message: 'success',
      })
    } catch (e) {
      if (e instanceof RegisterPetError) {
        return reply.status(409).send({ message: e.message })
      }

      throw e
    }
  }
}
