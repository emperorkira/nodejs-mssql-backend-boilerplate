import Joi from 'joi';

// access rights
export const accessright_schema = Joi.object({
    Code: Joi.string().pattern(/^[0-9]{6}$/),
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    CreatedBy: Joi.number().integer(),
    DateCreated: Joi.date(),
    UpdatedBy: Joi.number().integer().allow(null),
    DateUpdated: Joi.date().allow(null),
  });
  