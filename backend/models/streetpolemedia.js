'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StreetPoleMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StreetPoleMedia.hasMany(models.Route, { foreignKey: 'streetPoleMediaId' })
      StreetPoleMedia.belongsTo(models.Workspace, { foreignKey: 'workspaceId' })
    }
  }
  StreetPoleMedia.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    location: DataTypes.STRING,
    closestLandmark: DataTypes.STRING,
    availability: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Workspace',
        key: 'id',
    },
  },
  updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
  }
  }, {
    sequelize,
    modelName: 'StreetPoleMedia',
  });
  return StreetPoleMedia;
};