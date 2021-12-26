import { IUser } from './user.model';

export {};
const DB = require('../../database');

const TABLE = "Users";

/**
 * Returns list of users or empty array
 * @returns list of users Array<IUser> | []
 */
const getAll = (): Array<IUser> => DB.getAllEntities(TABLE);

/**
 * Returns user according to id or Throws error, if user doesn't exist
 * @param id id of user string
 * @returns user item IUser
 */
const getById = (id: string): IUser => DB.getEntityById(TABLE, id);

/**
 * Create user with data. Returns created user
 * @param data data for creating a new user IUser
 * @returns created user IUser
 */
const create = (data: IUser) => DB.createEntity(TABLE, data);

/**
 * Update corresponding user (finds user by id) with data. 
 * Returns updated user or Throws error, if user doesn't exist
 * @param id id of user string
 * @param data data for updating an existing user IUser
 * @returns updated user IUser
 */
const update = (id: string, data: IUser): IUser => DB.updateEntity(TABLE, id, data);

/**
 * Delete corresponding user (finds user by id). 
 * Throws error, if user doesn't exist
 * @param id id of user string
 * @returns void
 */
const remove = (id: string) => {
  const user: IUser = DB.getEntityById(TABLE, id);

  if (!user) {
    return null;
  }

  DB.removeEntity(TABLE, id);

  return user;
}

module.exports = { getAll, getById, create, update, remove };
