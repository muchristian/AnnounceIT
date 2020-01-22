import {Router} from 'express';
import {createUser, loginUser} from '../controllers/auth';
import {validateSignup} from '../middleware/validateData';

const proxy = '/auth';
const route = Router();

route.post(`${proxy}/signup`, validateSignup, createUser);
route.post(`${proxy}/signin`, loginUser);

export default route;