import { RegisterPetError } from '@/use-cases/errors/register-pet-error'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class SearchPetsController {
  async searchMany(request: FastifyRequest, reply: FastifyReply) {
    const petSchema = z.object({
      city: z.string(),
      age: z.enum(['puppy', 'adult', 'elderly']).optional(),
      size: z.enum(['small', 'medium', 'large']).optional(),
      energy_level: z.enum(['1', '2', '3', '4', '5']).optional(),
      independency: z.enum(['1', '2', '3', '4', '5']).optional(),
      environment: z.enum(['small', 'medium', 'large']).optional(),
      page: z.number().default(1).optional(),
    })
    const { age, size, energy_level, independency, environment, city, page } =
      petSchema.parse(request.body)
    try {
      const searchPetsUseCase = makeSearchPetsUseCase()
      await searchPetsUseCase.execute({
        city,
        age,
        energy_level,
        environment,
        independency,
        size,
        page,
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
