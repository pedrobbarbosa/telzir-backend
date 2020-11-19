import {Router} from 'express';
import telzirRoutes from './telzir.routes';

const routes = Router();

routes.use('/telzir', telzirRoutes);

export default routes;
