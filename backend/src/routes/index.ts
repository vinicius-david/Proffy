/* eslint-disable camelcase */
import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';
import ConnectionsController from '../controllers/ConnectionsController';

const routes = Router();

const classesController = new ClassesController();
const connectionsControlle = new ConnectionsController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsControlle.index);
routes.post('/connections', connectionsControlle.create);

export default routes;
