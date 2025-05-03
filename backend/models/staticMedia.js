'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StaticMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StaticMedia.hasMany(models.Face, { foreignKey: 'staticMediaId' })
      StaticMedia.belongsTo(models.Workspace, { foreignKey: 'workspaceId' })
    }
  }
  StaticMedia.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    type: DataTypes.STRING('static'),
    format: DataTypes.ENUM('standard', 'unipole', 'rooftop'),
    location: DataTypes.STRING,
    numberOfFaces: DataTypes.INTEGER,
    closestLandmark: DataTypes.STRING,
    availability: DataTypes.STRING,
    workspaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Workspace',
            key: 'id',
        },
    },
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
    modelName: 'StaticMedia',
  });
  return StaticMedia;
};