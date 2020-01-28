import { validateUser, validateAnnounce } from '../helpers/validator';

const validateSignup = async (req, res, next) => {
        const {error} = await validateUser(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                error: error.details[0].message
                });
        }
            return next();
};

const validateAnnounces = async (req, res, next) => {
    const {error} = await validateAnnounce(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                error: error.details[0].message
                });
        }
            return next();
};

export {validateSignup};