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
            through: PostCategory, as: 'categories',
            foreignKey: 'postId', otherKey: 'categoryId' 
        })  
        models.Category.belongsToMany(models.BlogPost,{
            through: PostCategory, as: 'blog_posts',
            foreignKey: 'categoryId', otherKey: 'postId' 
        })
    }   
    return PostCategory;
};
