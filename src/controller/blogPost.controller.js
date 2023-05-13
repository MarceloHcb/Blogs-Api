const { blogPostService } = require('../services');
const errorMap = require('../utils/errorMap');

const getBlogPosts = async (_req, res) => {
    try {
    const posts = await blogPostService.getBlogPosts();
    return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await blogPostService.getPostById(id);
        if (!post) return res.status(404).json({ message: 'Post does not exist' });
        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal error' });
    }
};

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

const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const userId = req.payload.data.id;
        const { type, message } = await blogPostService.updateBlogPost(id, body, userId);
        if (type) return res.status(errorMap.mapError(type)).json({ message });   
        return res.status(200).json(message);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'internal error' });
    }
};

module.exports = {
    getBlogPosts,
    createBlogPost,
    getPostById,
    updateBlogPost,
};