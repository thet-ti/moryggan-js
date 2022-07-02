const UserProfileType = require('../enumerators/user_profile_type');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: { type: Sequelize.UUID, primaryKey: true },

      photoUrl: { type: Sequelize.STRING(2048) },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: { type: Sequelize.TEXT },
      name: { type: Sequelize.STRING },
      cpf: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      birth: { type: Sequelize.DATE },
      profileType: { type: Sequelize.ENUM(Object.keys(UserProfileType)) },

      token: { type: Sequelize.TEXT },

      deletedAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },

      createdBy: { type: Sequelize.UUID },
      deletedBy: { type: Sequelize.UUID },
      updatedBy: { type: Sequelize.UUID },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user');
  },
};
