import { OrgAuthenticateController } from '@/http/controllers/Org/authenticate'
import { OrgRegisterController } from '@/http/controllers/Org/org-register-controller'
import { FastifyInstance } from 'fastify'
export function orgsRoutes(app: FastifyInstance) {
  const orgRegisterController = new OrgRegisterController()
  const orgAuthenticateController = new OrgAuthenticateController()
  app.post('/', orgRegisterController.register)
  app.post('/session', orgAuthenticateController.Authenticate)
}
