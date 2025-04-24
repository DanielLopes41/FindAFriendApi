import { FastifyReply, FastifyRequest } from 'fastify'

export async function loginRequired(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const jwt = await request.jwtVerify()
  if (!jwt) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  request.orgId = request.user.sub
}
