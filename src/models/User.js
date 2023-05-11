module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscore: true,
      timestamps: false,
      tableName: "users",
    }
  );
//   User.associate = (models) => {
//     User.hasMany(models.BlogPost, {
//       foreingkey: "user_id",
//       as: "users",
//     });
//   };
  return User;
};
