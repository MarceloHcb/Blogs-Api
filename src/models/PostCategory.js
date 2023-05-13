module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
    "PostCategory",
    {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,            
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,            
        },
    },    
    {
        timestamps: false,        
        tableName: "posts_categories",
        underscored: true,          
    }
    );
    PostCategory.associate=(models) => {
        models.BlogPost.belongsToMany(models.Category,{
            through: PostCategory, as: 'blog_posts',
            foreignKey: 'post_id', otherKey: 'category_id' 
        })  
        models.Category.belongsToMany(models.BlogPost,{
            through: PostCategory, as: 'categories',
            foreignKey: 'category_id', otherKey: 'post_id' 
        })
    }   
    return PostCategory;
};
