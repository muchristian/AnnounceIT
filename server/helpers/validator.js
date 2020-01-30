import Joi from '@hapi/joi';

const validateUser = user => {
    const schema = Joi.object({
        first_name: Joi.string()
        .min(3)
        .required(),
        last_name: Joi.string()
        .min(3)
        .required(),
        email: Joi.string()
        .email()
        .required(),
        password: Joi.string()
        .min(4)
        .required(),
        phone_number: Joi.string()
        .required(),
        address: Joi.string()
        .min(3)
        .required()
    });
    return schema.validate(user);
};

const validateAnnounceText = announce => {
    const schema = Joi.object({
        text: Joi.string()
        .min(6)
        .max(250)
        .required()
    });
    return schema.validate(announce);
};

const validateAnnounceStatus = announce => {
    const schema = Joi.object({
        status: Joi.string()
        .required()
    });
    return schema.validate(announce);
};



export { validateUser, validateAnnounceText, validateAnnounceStatus };