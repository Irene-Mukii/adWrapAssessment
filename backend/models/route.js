'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.belongsTo(models.StreetPoleMedia, { foreignKey: 'streetPoleMediaId' })
    }
  }
  Route.init({
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sideRoute: {
        allowNull: false,
        type: DataTypes.ENUM( 'North', 'South'), 
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      numberOfStreetPoles: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    pricePerStreetPole: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.STRING),
    streetPoleMediaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'StreetPoleMedia',
        key: 'id',
      },},
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
  },
  updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
  }
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};