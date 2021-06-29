import expres from 'express'
import ContactController from './controllers/ContactController'

const routes = expres.Router()

routes.get('/', ContactController.getAll)
routes.post('/', ContactController.create)


export default routes