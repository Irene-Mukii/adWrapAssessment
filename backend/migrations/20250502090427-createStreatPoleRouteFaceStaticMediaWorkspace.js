'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Workspaces table
    await queryInterface.createTable('Workspaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create StaticMedia table
    await queryInterface.createTable('StaticMedia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'static',
      },
      format: {
        type: Sequelize.ENUM('standard', 'unipole', 'rooftop'),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numberOfFaces: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      closestLandmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      availability: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workspaceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workspaces',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Faces table
    await queryInterface.createTable('Faces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      availability: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      rent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      staticMediaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StaticMedia',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create StreetPoleMedia table
    await queryInterface.createTable('StreetPoleMedia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      closestLandmark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      availability: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workspaceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workspaces',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create Routes table
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sideRoute: {
        type: Sequelize.ENUM('North', 'South'),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numberOfStreetPoles: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pricePerStreetPole: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      streetPoleMediaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'StreetPoleMedia',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order to avoid foreign key conflicts
    await queryInterface.dropTable('Routes');
    await queryInterface.dropTable('StreetPoleMedia');
    await queryInterface.dropTable('Faces');
    await queryInterface.dropTable('StaticMedia');
    await queryInterface.dropTable('Workspaces');
  },
};