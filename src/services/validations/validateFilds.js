const { loginSchemaFields, nameSchema, postSchemaFields } = require('./schemas');

const validateUserFields = (userFields) => {
    const { error } = loginSchemaFields.validate(userFields);    
    if (error) return { type: 'INVALID_FIELDS', message: error.message };
    return { type: null, message: '' };
};
const categoryNameValidation = (name) => {    
const { error } = nameSchema.validate({ name });
if (error) return { type: 'INVALID_FIELDS', message: error.message };
    return { type: null, message: '' };
};

const validatePostFields = (postFields, categories) => {
    try {
    const { error } = postSchemaFields.validate(postFields);
    if (error) return { type: 'INVALID_FIELDS', message: 'Some required fields are missing' };    
    const allIdsFound = postFields.categoryIds
    .every((categoryId) => categories.some((category) => category.id === categoryId));
if (!allIdsFound) return { type: 'INVALID_FIELDS', message: 'one or more "categoryIds" not found' };
    return { type: null, message: '' };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    validateUserFields,
    categoryNameValidation,
    validatePostFields,
};