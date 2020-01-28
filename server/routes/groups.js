import Router from 'express';
import checkToken from '../middleware/checkToken';
import {
  validateNewGroup,
  validateNewMember,
  validateNewMessage
} from '../middleware/validateData';
import {
  createGroups,
  getAllGroups,
  updateGroup,
  deleteGroup,
  addGroupMember,
  sendMessageToGroup,
  deleteMember
} from '../controllers/groups';

const router = Router();
const groupEntry = '/groups';
// create group route

router.post(`${groupEntry}`, checkToken, validateNewGroup, createGroups);
router.get(`${groupEntry}`, checkToken, getAllGroups);
router.patch(`${groupEntry}/:id/name`, checkToken, validateNewGroup, updateGroup);
router.delete(`${groupEntry}/:id`, checkToken, deleteGroup);
router.post(`${groupEntry}/:id/users`,checkToken,validateNewMember, addGroupMember);
router.post(`${groupEntry}/:id/message`, checkToken, validateNewMessage, sendMessageToGroup);
router.delete(`${groupEntry}/:groupId/users/:userId`, checkToken, deleteMember);
export default router;
