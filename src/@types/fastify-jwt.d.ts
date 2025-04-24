// src/@types/fastify-jwt.d.ts
import '@fastify/jwt'
declare module 'fastify' {
  interface FastifyRequest {
    orgId?: string
  }
}
declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    }
  }
}
