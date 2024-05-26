import Joi from 'joi';

export const client_schema = Joi.object({
    Code: Joi.string().pattern(/^[0-9]{6}$/),
    Name: Joi.string().required(),
    Address: Joi.string().required(),
    Email: Joi.string().required(),
    ContactPerson: Joi.string().required(),
    MobileNumber: Joi.string().required(),
    LandlineNumber: Joi.string().allow(null),
    DateSoftwareAcceptance: Joi.date(),
    DateBCSExpiry: Joi.date(),
    DateBCSRenewal: Joi.date(),
    IsDeleted: Joi.number().integer(),
    DeletedBy: Joi.number().integer().allow(null),
    CreatedBy: Joi.number().integer(),
    DateCreated: Joi.date(),
    UpdatedBy: Joi.number().integer().allow(null),
    DateUpdated: Joi.date().allow(null),
  });
  
  export const clientline_schema = Joi.object({
    Id: Joi.number().integer().required(),
    ClientId: Joi.number().integer().allow(null),
    ProductId: Joi.number().integer().required().allow(null),
    Quantity: Joi.number().precision(5).allow(null),
    DateCreated: Joi.date().allow(null),
  });
  