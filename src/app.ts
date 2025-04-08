import fastify from 'fastify'
import { orgsRoutes } from './routes/orgsRoutes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify({
  logger: true,
})
const routes = [{ handler: orgsRoutes, prefix: '/orgs' }]
routes.forEach(({ handler, prefix }) => {
  app.register(handler, { prefix })
})

app.setErrorHandler((e, _, reply) => {
  if (e instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: e.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(e)
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
