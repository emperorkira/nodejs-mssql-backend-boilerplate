import Joi from 'joi';

export const login_schema = Joi.object({
  Username: Joi.string().required(),
  Password: Joi.string().required(),
});
