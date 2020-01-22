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
        phoneNumber: Joi.string()
        .required(),
        address: Joi.string()
        .min(3)
        .required(),
        is_admin: Joi.boolean()
    });
    return schema.validate(user);
};




export { validateUser };