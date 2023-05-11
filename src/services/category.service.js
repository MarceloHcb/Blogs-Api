const { Category } = require('../models');
const { categoryNameValidation } = require('./validations/validationUserFilds');

const createCategory = async (name) => {
    const error = categoryNameValidation(name);
    if (error.type) return error;
    const newCategory = await Category.create({ name });
    return { type: null, message: newCategory };
};

module.exports = {
    createCategory,
};