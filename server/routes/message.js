import Router from 'express';
import { validateNewMessage } from '../middleware/validateData';
import checkToken from '../middleware/checkToken';
import {
  createMessage,
  getAllReceivedMessages,
  getMessage,
  getAllSentMessages,
  deleteMessage
} from '../controllers/messages';

const route = Router();
const entryPoint = '/messages';
// message routes

route.post(`${entryPoint}`, checkToken, validateNewMessage, createMessage);
route.get(`${entryPoint}`, checkToken, getAllReceivedMessages);
route.get(`${entryPoint}/sent`, checkToken, getAllSentMessages);
route.get(`${entryPoint}/:id`, checkToken, getMessage);
route.delete(`${entryPoint}/:id`, checkToken, deleteMessage);

export default route;
