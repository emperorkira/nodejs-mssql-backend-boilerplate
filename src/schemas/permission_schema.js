import Joi from 'joi';

export const permission_schema = Joi.object({
    Code: Joi.string().pattern(/^[0-9]{6}$/),
    RoleId: Joi.number().integer().required(),
    AccessRightId: Joi.number().integer().required(),
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    CreatedBy: Joi.number().integer(),
    DateCreated: Joi.date(),
    UpdatedBy: Joi.number().integer().allow(null),
    DateUpdated: Joi.date().allow(null),
});