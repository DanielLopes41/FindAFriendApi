import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class OrgAuthenticateController {
  async Authenticate(request: FastifyRequest, reply: FastifyReply) {
    const orgSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    const { email, password } = orgSchema.parse(request.body)
    try {
      const authenticateUseCase = makeAuthenticateUseCase()
      await authenticateUseCase.execute({
        email,
        password,
      })
      return reply.status(200).send()
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: e.message })
      }

      throw e
    }
  }
}
