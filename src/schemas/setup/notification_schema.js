import Joi from 'joi';

export const notification_schema = Joi.object({
    UserId: Joi.number().integer(),
    Description: Joi.string(),
    LinkedComponent: Joi.string().allow(null),
    Status: Joi.number().integer()
});