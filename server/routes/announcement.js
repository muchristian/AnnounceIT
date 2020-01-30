import {Router} from 'express';
import { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner, viewAnnouncementByState, viewAnnouncementById, deleteAnnouncement, updateAnnounceStatus, viewAllAnnounces} from '../controllers/announcement';
import { validateAnnounces } from '../middleware/validateData'
import { userVerify, isadminVerify } from '../middleware/authToken';

const route = Router();

route.post(`/announcement`, [userVerify, validateAnnounces], createAnnounce);
route.put(`/announcement/:id`, [userVerify, validateAnnounces], updateAnnounce);
route.get(`/announcements/:owner`, userVerify, viewAllAnnouncebyOwner);
route.get(`/announcements-state/:id`, userVerify, viewAnnouncementByState);
route.get(`/announcement-id/:id`, userVerify, viewAnnouncementById);
export default route;