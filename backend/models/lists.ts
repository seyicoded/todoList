'use strict';

import {Model, DataTypes} from 'sequelize'

module.exports = (sequelize) => {
  class lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log(models)
      (models.lists).belongsTo(models.users);
    }
  }
  lists.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
  }, {
    sequelize,
    modelName: 'lists',
  });
  return lists;
};