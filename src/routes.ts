import expres from 'express'
import ContactController from './controllers/ContactController'

const routes = expres.Router()

routes.get('/', ContactController.getAll)


export default routes