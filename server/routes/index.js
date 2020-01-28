import { Router } from 'express';
import authRoutes from './authorization';
import messagesRoutes from './message';
import groupsRoutes from './groups';
// import all of your routes from their files

const routes = Router();

/** ********* API ENTRYPOINT **************************** */

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});

/** ********** ALL ENDPOINTS *************************** */

routes.use(entryPoint, authRoutes, messagesRoutes,groupsRoutes);

export default routes;
