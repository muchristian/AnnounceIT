import {Router} from 'express';
import { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner } from '../controllers/announcement';
import { validateAnnounces } from '../middleware/validateData'
import { userVerify } from '../middleware/authToken';

const route = Router();

route.post(`/announcement`, [userVerify, validateAnnounces], createAnnounce);
route.put(`/announcement/:id/`, [userVerify, validateAnnounces], updateAnnounce);
route.get(`/announcement/:owner`, userVerify, viewAllAnnouncebyOwner);

export default route;