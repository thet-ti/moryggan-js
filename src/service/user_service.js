import { db } from '../configs/database_instance';
import { UserRepository } from '../repositories/user_repository';
import { hash } from '../utils/hash';

const { sequelize: $ } = db;

export class UserService {
  static async create(data) {
    const transaction = await $.transaction();
    try {
      data = {
        ...data,
        password: hash(data.password),
      };

      const user = await UserRepository.create(data, { transaction });

      await transaction.commit();

      return user;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new Error(error.message);
    }
  }

  static async getAll(params) {
    try {
      const users = await UserRepository.selectWithPagination({
        offset: params.offset,
        orderBy: params.orderBy,
        isDESC: params.isDESC,
        limit: params.limit,
      });

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    try {
      const user = await UserRepository.selectOne({ where: { id } });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateById(id, data) {
    try {
      if (data.password) {
        data.password = hash(data.password);
      }

      const user = await UserRepository.updateById(id, data);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteById(id) {
    try {
      const user = await UserRepository.deleteById(id);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
