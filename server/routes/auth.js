import {Router} from 'express';
import {createUser} from '../controllers/auth';
import {validateSignup} from '../middleware/validateData';

const proxy = '/auth';
const route = Router();

route.post(`${proxy}/signup`, validateSignup, createUser);

export default route;