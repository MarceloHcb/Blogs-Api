const { loginUserFields } = require('./schemas');

const validationUserFields = (userFields) => {
    const { error } = loginUserFields.validate(userFields);    
    if (error) return { type: 'INVALID_FIELDS', message: error.message };
    return { type: null, message: '' };
};

module.exports = {
    validationUserFields,
};