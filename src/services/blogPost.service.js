const { BlogPost, Category, PostCategory } = require('../models');
const { validatePostFields } = require('./validations/validateFilds');

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
module.exports = {    
    createBlogPost,    
};
