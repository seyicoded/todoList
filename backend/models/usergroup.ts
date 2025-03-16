'use strict';

import {Model, DataTypes} from 'sequelize'

module.exports = (sequelize) => {
  class usergroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log(models)
      (models.usergroup).belongsTo(models.groups);
      (models.usergroup).belongsTo(models.users);
    }
  }
  usergroup.init({
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usergroup',
  });
  return usergroup;
};