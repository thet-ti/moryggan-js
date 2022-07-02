import { db } from '../configs/database_instance';

const { User } = db.models;

export class UserRepository {
  static async create(data, options) {
    try {
      const user = User.build(data);

      const response = await user.save({
        transaction: options ? options.transaction : null,
        returning: true,
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async selectAll(options) {
    try {
      options = {
        ...options,
        attributes: (options && options.attributes) || {
          exclude: ['password'],
        },
      };

      const response = await User.findAll(options);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async selectWithPagination(options) {
    try {
      options = {
        ...options,
        distinct: options && options.include && options.include.length > 0,
        attributes: (options && options.attributes) || {
          exclude: ['password'],
        },
      };
      const response = await User.findAndCountAll(options);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async selectOne(options) {
    try {
      options = {
        ...options,
        attributes: (options && options.attributes) || {
          exclude: ['password'],
        },
      };

      const response = await User.findOne(options);

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateById(id, data, options) {
    try {
      const [, [response]] = await User.update(data, {
        where: { id },
        transaction: options && options.transaction,
        returning: true,
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteById(id) {
    try {
      const response = await User.destroy({
        where: {
          id,
        },
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
