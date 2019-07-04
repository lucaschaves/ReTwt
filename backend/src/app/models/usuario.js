"use strict";
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      usu_nome: DataTypes.STRING,
      usu_login: DataTypes.STRING,
      usu_senha: DataTypes.STRING
    },
    {}
  );
  Usuario.associate = function(models) {
    Usuario.hasMany(models.Post, { foreignKey: "usuarioid" });
  };
  return Usuario;
};
