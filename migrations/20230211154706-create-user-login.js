/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_login', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      refresh_token_id: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      access_token_id: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      logout: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_login');
  },
};
