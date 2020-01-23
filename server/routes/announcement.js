import {Router} from 'express';
import { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner, viewAnnouncementById, deleteAnnouncement, updateAnnounceStatus, viewAllAnnounces} from '../controllers/announcement';
import { validateAnnounces } from '../middleware/validateData'
import { userVerify } from '../middleware/authToken';

const route = Router();

route.post(`/announcement`, [userVerify, validateAnnounces], createAnnounce);
route.put(`/announcement/:id/`, [userVerify, validateAnnounces], updateAnnounce);
route.get(`/announcement/:owner`, userVerify, viewAllAnnouncebyOwner);
route.get(`/announcement-id/:id`, userVerify, viewAnnouncementById);
route.delete(`/announcement/:id`, userVerify, deleteAnnouncement);
route.put(`/announcement/:id/sold`, userVerify, updateAnnounceStatus);
route.get(`/announcement`, userVerify, viewAllAnnounces);

export default route;