'use strict';
import {Model, DataTypes} from 'sequelize'

module.exports = (sequelize) => {
  class groups extends Model{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      (models.groups).belongsTo(models.users)
    }
  }
  groups.init({
    title: DataTypes.STRING,
    num_user: DataTypes.STRING,
    target: DataTypes.INTEGER,
    frequency: DataTypes.STRING,
    start: DataTypes.STRING,
    amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};