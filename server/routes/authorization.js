import Router from 'express';
import { login, createUser, resetPassword } from '../controllers/auth';
import { validateSignup } from '../middleware/validateData';
const router = Router();
const entry = '/auth';
// create authentication route

router.post(`${entry}/signup`, createUser);
router.post(`${entry}/login`, login);
router.post(`${entry}/reset`, resetPassword);
export default router;
