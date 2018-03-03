'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_img: DataTypes.STRING,
    about: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // When a User is deleted, also delete any associated comments
    User.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  
    User.hasMany(models.Project, {
      onDelete: "cascade"
    });  
  };
  return User;
};