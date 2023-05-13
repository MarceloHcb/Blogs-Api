const { BlogPost, Category, PostCategory, User } = require('../models');
const { validatePostFields, validatePostUpdate } = require('./validations/validateFilds');

const userAutorization = (id) => BlogPost.findByPk(id);
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

const createBlogPost = async (userId, newPostBody) => {
        const categories = await Category.findAll();                
        const error = validatePostFields(newPostBody, categories);        
        if (error.type) return error;
        const { dataValues } = await BlogPost
        .create({ ...newPostBody, userId });  
        
        await Promise.all(
            newPostBody.categoryIds.map((id) => (
                PostCategory.create(
                { postId: dataValues.id, categoryId: id },
                )
            )),
        );
        
    return { type: null, message: dataValues }; 
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
return deletedPost;
};

module.exports = { 
    getBlogPosts,
    getPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    userAutorization,
};
