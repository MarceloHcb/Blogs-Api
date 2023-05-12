module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
    "BlogPost",
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        title: {        
        type: DataTypes.STRING,
        allowNull: false,
        },  
        content: {        
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            field: 'userId',
            type: DataTypes.INTEGER,
            foreignKey: true,
            
        },
        published: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated: {
            allowNull: false,
            type: DataTypes.DATE
        },

    },
    {
        timestamps: true,
        tableName: "blog_posts",
    }
    );
    BlogPost.associate=(models) => {
        BlogPost.belongsTo(models.User,{
            foreignKey: 'user_id', as: 'users'            
        })
    }
    return BlogPost;
};
