"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      post_descricao: DataTypes.STRING,
      post_like: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      usuarioid: DataTypes.INTEGER,
      data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {}
  );
  Post.associate = function(models) {
    Post.belongsTo(models.Usuario, { foreignKey: "usuarioid" });
  };
  return Post;
};
