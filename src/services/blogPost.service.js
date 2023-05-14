const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');
const { validatePostFields, validatePostUpdate } = require('./validations/validateFilds');

const getBlogPosts = () => BlogPost.findAll({
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },

    ],
    attributes: { exclude: ['user_id'] },
});

const getPostById = (id) => BlogPost.findByPk(id, {
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
    ],
    attributes: { exclude: ['user_id'] },
    });

    const getPostsBySearch = async (searchBody) => {        
        const searchedPosts = await BlogPost.findAll({ 
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories' },
            ],
            attributes: { exclude: ['user_id'] },          
            where: { 
                [Op.or]: [
                { title: { [Op.like]: `%${searchBody}%` } },
                { content: { [Op.like]: `%${searchBody}%` } },
                ],
        },
        });        
        return searchedPosts;
    };

const createBlogPost = async (userId, newPostBody) => {
    const categories = await Category.findAll();                
    const error = validatePostFields(newPostBody, categories);        
    if (error.type) return error;
    const result = sequelize.transaction(async (t) => {
        const { dataValues } = await BlogPost
        .create({ ...newPostBody, userId }, { transaction: t });        
        await Promise.all(
            newPostBody.categoryIds.map((id) => (
                PostCategory.create(
                { postId: dataValues.id, categoryId: id },
                { transaction: t },
                )
            )),
        );
        return dataValues;
    });    
    return { type: null, message: await result }; 
};

const updateBlogPost = async (id, newBody) => { 
    const error = validatePostUpdate(newBody);        
        if (error.type) return error;   
    await BlogPost.update(newBody, { where: { id } });
    const updatedPost = await BlogPost.findByPk(id, {
        include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
        ],
        attributes: { exclude: ['user_id'] },
        });    
    return { type: null, message: updatedPost };
};

const deleteBlogPost = async (id) => {
const deletedPost = await BlogPost.destroy({ where: { id } });
    return { type: null, message: deletedPost };
};
module.exports = { 
    getBlogPosts,
    getPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getPostsBySearch,
};
