import Joi from 'joi';

export const devicetoken_schema = Joi.object({
    UserId: Joi.number().integer().required(),
    Tokens: Joi.string().max(255).required()
});