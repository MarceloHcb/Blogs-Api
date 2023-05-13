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
    userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,        
    },
    published: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "published",
    },
    updated: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "updated",
    },
    },
    {
    timestamps: true,
    tableName: "blog_posts",
    underscored: true,
    createdAt: "published",
    updatedAt: "updated",    
    }
);

BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
    });
};

return BlogPost;
};
