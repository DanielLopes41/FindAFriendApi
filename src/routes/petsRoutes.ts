import { DeletePetController } from '@/http/controllers/Pet/delete-pet-controller'
import { GetPetController } from '@/http/controllers/Pet/get-pet-controller'
import { PetRegisterController } from '@/http/controllers/Pet/register-pet-controller'
import { PetRequirementController } from '@/http/controllers/Pet/Requirements/pet-requirements-controller'
import { SearchPetsController } from '@/http/controllers/Pet/search-pets-controller'
import { loginRequired } from '@/middlewares/loginRequired'
import { FastifyInstance } from 'fastify'
export function petsRoutes(app: FastifyInstance) {
  const petRegisterController = new PetRegisterController()
  const petRequirementController = new PetRequirementController()
  const deletePetController = new DeletePetController()
  const searchPetsController = new SearchPetsController()
  const getPetController = new GetPetController()
  app.post(
    '/pet',
    { preHandler: loginRequired },
    petRegisterController.register,
  )
  app.post(
    '/requirement',
    { preHandler: loginRequired },
    petRequirementController.register,
  )
  app.delete(
    '/pets/:id',
    { preHandler: loginRequired },
    deletePetController.delete,
  )
  app.post('/pets', searchPetsController.searchMany)
  app.get('/pet/:id', getPetController.getPet)
}
