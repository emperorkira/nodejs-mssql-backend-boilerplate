import Joi from 'joi';

export const devicetoken_schema = Joi.object({
    UserId: Joi.number().integer().required(),
    Tokens: Joi.string().max(255).required(),
    CreatedBy: Joi.number().integer().allow(null),
    DateCreated: Joi.date().allow(null),
    UpdatedBy: Joi.number().integer().allow(null),
    DateUpdated: Joi.date().allow(null),
});