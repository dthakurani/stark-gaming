const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  User.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resetPasswordToken: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      resetPasswordTokenUse: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      tableName: 'user',
      modelName: 'User',
    }
  );
  return User;
};
