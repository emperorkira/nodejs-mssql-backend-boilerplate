import Joi from 'joi';

export const licenserequest_schema = Joi.object({
    RequestNumber: Joi.string().required(),
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    ClientId: Joi.number().integer().required(),
    ProductId: Joi.number().integer().required(),
    ProductKey: Joi.string().required(),
    IsApprove: Joi.number().integer().required(),
    IsDeleted: Joi.number().integer(),
    DeletedBy: Joi.number().integer().required(),
    CreatedBy: Joi.number().integer(),
    DateCreated: Joi.date(),
    UpdatedBy: Joi.number().integer().allow(null),
    DateUpdated: Joi.date().allow(null),
  });
  