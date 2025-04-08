import { OrgRegisterController } from '@/http/controllers/Org/org-controller'
import { FastifyInstance } from 'fastify'
export function orgsRoutes(app: FastifyInstance) {
  const orgRegisterController = new OrgRegisterController()
  app.post('/', orgRegisterController.register)
  app.post('/authenticate', orgRegisterController.register)
}
