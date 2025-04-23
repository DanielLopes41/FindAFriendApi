import { PetRequirementController } from '@/http/controllers/Org/pet-requirement-controller'
import { DeletePetController } from '@/http/controllers/Pet/delete-pet-controller'
import { PetRegisterController } from '@/http/controllers/Pet/register-pet-controller'
import { FastifyInstance } from 'fastify'
export function petsRoutes(app: FastifyInstance) {
  const petRegisterController = new PetRegisterController()
  const petRequirementController = new PetRequirementController()
  const deletePetController = new DeletePetController()
  app.post('/', petRegisterController.register)
  app.post('/requirement', petRequirementController.register)
  app.delete('/pets/:id', deletePetController.delete)
}
