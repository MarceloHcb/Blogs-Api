const Joi = require('joi');

const loginSchemaFields = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});
const nameSchema = Joi.object({
  name: Joi.string().min(1).required(),
});
const postSchemaFields = Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),     
}).unknown();

module.exports = {
  loginSchemaFields,  
  nameSchema,
  postSchemaFields,
};