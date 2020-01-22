import Joi from '@hapi/joi';

const validateUser = user => {
    const schema = Joi.object({
        first_name: Joi.string()
        .min(3)
        .regex(/^[a-zA-Z ]/)
        .required(),
        last_name: Joi.string()
        .min(3)
        .regex(/^[a-zA-Z ]/),
        email: Joi.string()
        .regex(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        .required(),
        password: Joi.string()
        .regex(/^[a-zA-Z0-9]/)
        .required(),
        phoneNumber: Joi.string()
        .regex(/^[0-9]{10}/)
        .required(),
        address: Joi.string()
        .min(3)
        .required(),
        is_admin: Joi.boolean()
    });
    return schema.validate(user);
};



export { validateUser };