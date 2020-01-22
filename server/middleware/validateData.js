import { validateUser } from '../helpers/validator';

const validateSignup = async (req, res, next) => {
        const {error} = await validateUser(req.body);
        if(error){
            return res.status(400).json({
                status:'error',
                error: error.details[0].message
                });
        }
            return next();
};

export {validateSignup};