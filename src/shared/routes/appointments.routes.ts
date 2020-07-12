import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../Modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../Modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensuredAuthenticated';

const appointmentsRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// GET http://localhost/appointments
appointmentsRouter.get('/', async (request, response) => {
    // console.log(request.user);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;