const { blogPostService } = require('../services');
const errorMap = require('../utils/errorMap');

const createBlogPost = async (req, res) => {
    try {
        const { id } = req.payload.data;        
    const { type, message } = await blogPostService.createBlogPost(id, req.body);
    if (type) return res.status(errorMap.mapError(type)).json({ message });   
    return res.status(201).json(message);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
};

module.exports = {
    createBlogPost,
};