'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.hasMany(models.User, {foreignKey: 'id'})
    }
  };
  Transactions.init({
    description: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};