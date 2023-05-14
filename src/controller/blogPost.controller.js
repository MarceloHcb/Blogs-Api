const { blogPostService } = require('../services');
const errorMap = require('../utils/errorMap');

const internalError = 'internal error';
const confirmExistPost = (conditional, res) => {
    if (conditional) res.status(404).json({ message: 'Post does not exist' }); 
};
const getBlogPosts = async (_req, res) => {
    try {
    const posts = await blogPostService.getBlogPosts();
    return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: internalError });
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
        return res.status(500).json({ message: internalError });
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
        return res.status(500).json({ message: internalError });
    }
};

const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;        
        const { type, message } = await blogPostService.updateBlogPost(id, body);
        if (type) return res.status(errorMap.mapError(type)).json({ message });   
        return res.status(200).json(message);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: internalError });
    }
};

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await blogPostService.deleteBlogPost(id);    
        if (type) return res.status(errorMap.mapError(type)).json({ message });  
        confirmExistPost(+message === 0, res);
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: internalError });
    }
};
module.exports = {
    getBlogPosts,
    createBlogPost,
    getPostById,
    updateBlogPost,
    deleteBlogPost,
};