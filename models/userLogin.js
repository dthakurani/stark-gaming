const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class UserLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'user',
      });
    }
  }
  UserLogin.init(
    {
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      refreshTokenId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      accessTokenId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      logout: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'user_login',
      modelName: 'UserLogin',
    }
  );
  return UserLogin;
};
