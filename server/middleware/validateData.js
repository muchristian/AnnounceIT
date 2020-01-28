import {
  validateMessage,
  validateUser,
  validateGroup,
  validateMember
} from '../helpers/validator';

const validateSignup = async (req, res, next) => {
  try {
    await validateUser(req.body);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: 'invalid input' });
    }
  }
};
const validateNewMessage = async (req, res, next) => {
  try {
    await validateMessage(req.body);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: 'invalid input' });
    }
  }
};
const validateNewGroup = async (req, res, next) => {
  try {
    await validateGroup(req.body);
    next();
  } catch (error) {
    if (error.details) {
      return res.status(400).json({ status: 400, error: 'invalid input' });
    }
  }
};
const validateNewMember = async (req, res, next) => {
  try {
    await validateMember(req.body);
    next();
  } catch (error) {
    if (error.details) {
      // return res.status(400).json({ status: 400, error: 'invalid input' });
      console.log(error.details);
    }
  }
};
export { validateNewMessage, validateSignup, validateNewGroup, validateNewMember };
