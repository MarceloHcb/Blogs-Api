const Joi = require('joi');

const loginUserFields = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});
const nameSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

module.exports = {
  loginUserFields,  
  nameSchema,
};