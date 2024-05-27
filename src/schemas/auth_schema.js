  /**
   * AUTHOR       : Mark Dinglasa
   * COMMENT/S    : N/A
   * CHANGES      : N/A
   * LOG-DATE     : 2024-05-27 11:48PM
  */
 
  import Joi from 'joi';
  export const login_schema = Joi.object({
    Username: Joi.string().required(),
    Password: Joi.string().required(),
  });
