import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensuredAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// GET http://localhost/appointments
// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
