'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Face extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Face.belongsTo(models.StaticMedia, { foreignKey: 'staticMediaId' })
    }
  }
  Face.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    description: DataTypes.STRING,
    availability: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    rent: DataTypes.INTEGER,
    staticMediaId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'StaticMedia',
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
    modelName: 'Face',
  });
  return Face;
};