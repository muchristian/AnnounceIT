import {Router} from 'express';
import { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner, viewAnnouncementByState, viewAnnouncementById, deleteAnnouncement, updateAnnounceStatus, viewAllAnnounces} from '../controllers/announcement';
import { validateAnnounces } from '../middleware/validateData'
import { userVerify, isadminVerify } from '../middleware/authToken';

const route = Router();

route.post(`/announcement`, [userVerify, validateAnnounces], createAnnounce);
route.put(`/announcement/:id/`, [userVerify, validateAnnounces], updateAnnounce);
route.get(`/announcement/:owner`, userVerify, viewAllAnnouncebyOwner);
route.get(`/announcement-id/:id`, userVerify, viewAnnouncementById);
route.delete(`/announcement/:id`, [userVerify, isadminVerify], deleteAnnouncement);
route.put(`/announcement/:id/sold`, [userVerify, isadminVerify], updateAnnounceStatus);
route.get(`/announcement`, [userVerify, isadminVerify], viewAllAnnounces);
route.get(`/announcement-state/:id`, userVerify, viewAnnouncementByState);

export default route;