import { Router } from 'express';
import authRouter from './auth';
import api from '../config/constants';


export default server => {

    
    const routes = Router();
    const entryPoint = Router();
    entryPoint.get('/', (req, res) => {
        res.status(200).json({status:'success', message:'welcome'});
    });

    routes.use(entryPoint, authRouter);
    server.use(api.PROXY, routes);
};

