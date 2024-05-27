import Joi from 'joi';

export const permission_schema = Joi.object({
    RoleId: Joi.number().integer().required(),
    AccessRightId: Joi.number().integer().required()
});