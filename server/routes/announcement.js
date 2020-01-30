import {Router} from 'express';
import { createAnnounce, updateAnnounce, viewAllAnnouncebyOwner, viewAnnouncementByState, viewAnnouncementById, deleteAnnouncement, updateAnnounceStatus, viewAllAnnounces} from '../controllers/announcement';
import { validateAnnouncesText, validateAnnouncesStatus } from '../middleware/validateData'
import { userVerify, isadminVerify } from '../middleware/authToken';

const route = Router();

route.post(`/announcement`, [userVerify, validateAnnouncesText], createAnnounce);
route.put(`/announcement/:id`, [userVerify, validateAnnouncesText], updateAnnounce);
route.get(`/announcements/:owner/`, userVerify, viewAllAnnouncebyOwner);
route.get(`/announcements/:owner`, userVerify, viewAnnouncementByState);
route.get(`/announcement/:id`, userVerify, viewAnnouncementById);
route.delete(`/announcement/:id`, [userVerify, isadminVerify], deleteAnnouncement);
route.put(`/announcement/:id/sold`, [userVerify, isadminVerify, validateAnnouncesStatus], updateAnnounceStatus);
route.get(`/announcements`, [userVerify, isadminVerify], viewAllAnnounces);
export default route;