import { validateUser, validateAnnounceText, validateAnnounceStatus } from '../helpers/validator';

const validateSignup = (req, res, next) => {
        const {error} = validateUser(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                error: error.details[0].message
                });
        }
            return next();
};

const validateAnnouncesText = (req, res, next) => {
    const {error} = validateAnnounceText(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                error: error.details[0].message
                });
        }
            return next();
};

const validateAnnouncesStatus = (req, res, next) => {
    const {error} = validateAnnounceStatus(req.body);
        if(error){
            return res.status(400).json({
                status:400,
                error: error.details[0].message
                });
        }
            return next();
};

export {validateSignup, validateAnnouncesText, validateAnnouncesStatus};