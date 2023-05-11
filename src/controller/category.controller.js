const { categoryService } = require('../services');
const errorMap = require('../utils/errorMap');
    
const createCategory = async (req, res) => {
    try {
        const { type, message } = await categoryService.createCategory(req.body.name);
        if (type) return res.status(errorMap.mapError(type)).json({ message });
        return res.status(201).json(message);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal error' });
    }
};

module.exports = {
    createCategory,
};