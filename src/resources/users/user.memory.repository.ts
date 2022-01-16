import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { IUser } from './user.model';

// export {};
// const DB = require('../../database');
const userRepo = getRepository(User);
// const TABLE = "Users";

/**
 * Returns list of users or empty array
 * @returns list of users Array<IUser> | []
 */
const getAll = (): Promise<IUser[]> => userRepo.find({ select: ['id', 'login', 'name'] });

/**
 * Returns user according to id or Throws error, if user doesn't exist
 * @param id id of user string
 * @returns user item IUser
 */
const getById = (id: string): Promise<IUser> => userRepo.findOne(id);

/**
 * Create user with data. Returns created user
 * @param data data for creating a new user IUser
 * @returns created user IUser
 */
const create = (data: IUser) => {
  const user = new User();
  const { name, login } = data;
  user.name = name;
  user.login = login;

  return userRepo.save(user);
};

/**
 * Update corresponding user (finds user by id) with data. 
 * Returns updated user or Throws error, if user doesn't exist
 * @param id id of user string
 * @param data data for updating an existing user IUser
 * @returns updated user IUser
 */
const update = (id: string, data: IUser): Promise<IUser> => {
  const { name, login } = data;
  userRepo.update(id, { name, login });
  return userRepo.findOne(id);
};

/**
 * Delete corresponding user (finds user by id). 
 * Throws error, if user doesn't exist
 * @param id id of user string
 * @returns void
 */
const remove = (id: string) => {
  const user: Promise<User> = userRepo.findOne(id);

  if (!user) {
    return null;
  }

  userRepo.delete(id)

  return user;
}

module.exports = { getAll, getById, create, update, remove };
