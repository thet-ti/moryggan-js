import UserProfileType from '../enumerators/user_profile_type';

export default (sequelize, type) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: type.UUID, primaryKey: true, field: 'id', defaultValue: type.UUIDV4,
      },

      photoUrl: { type: type.STRING(2048), field: 'photoUrl' },
      email: { type: type.STRING, field: 'email' },
      password: { type: type.TEXT, field: 'password' },
      name: { type: type.STRING, field: 'name' },
      cpf: { type: type.STRING, field: 'cpf' },
      phone: { type: type.STRING, field: 'phone' },
      birth: { type: type.DATE, field: 'birth' },
      profileType: { type: type.ENUM(Object.keys(UserProfileType)), field: 'profileType' },
      token: { type: type.TEXT, field: 'token' },

      deletedAt: { type: type.DATE, field: 'deletedAt' },
      createdAt: { type: type.DATE, field: 'createdAt' },
      updatedAt: { type: type.DATE, field: 'updatedAt' },

      createdBy: { type: type.UUID, field: 'createdBy' },
      deletedBy: { type: type.UUID, field: 'deletedBy' },
      updatedBy: { type: type.UUID, field: 'updatedBy' },
    },
    {
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password;
        },
      },
      tableName: 'user',
      freezeTableName: true,
      timestamps: true,

      paranoid: true,

      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    },
  );

  return User;
};
