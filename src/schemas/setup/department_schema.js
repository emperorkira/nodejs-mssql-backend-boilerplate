import Joi from 'joi'

export const department_schema = Joi.object({
    Code: Joi.string().pattern(/^[0-9]{6}$/),
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    IsDeleted: Joi.number().integer().required(),
    DeletedBy: Joi.number().integer().allow(null),
    CreatedBy: Joi.number().allow(null),
    DateCreated: Joi.date(),
    UpdatedBy: Joi.number().allow(null),
    DateUpdated: Joi.date()
});
