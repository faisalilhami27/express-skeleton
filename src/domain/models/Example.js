const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Example extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Example.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    field: DataTypes.STRING, // change this field name to your own
    createdAt: {
      type: DataTypes.DATE,
      name: 'createdAt',
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      name: 'updatedAt',
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      name: 'deletedAt',
      field: 'deleted_at',
    },
  }, {
    sequelize,
    modelName: 'Example',
    tableName: 'examples',
    timestamps: true,
    paranoid: true, // soft delete
  });
  return Example;
};
