import { IUser } from './user.model';

export {};
const usersRepo = require('./user.memory.repository');

/**
 * Returns list of users or empty array
 * @returns list of users Array<IUser> | []
 */
const getAll = async (): Promise<Array<IUser>> => usersRepo.getAll();

/**
 * Returns user according to id or Throws error, if user doesn't exist
 * @param id id of user string
 * @returns user item IUser
 */
const getById = async (id: string): Promise<IUser> => usersRepo.getById(id);

/**
 * Create user with data. Returns created user
 * @param data data for creating a new user IUser
 * @returns created user IUser
 */
const create = async (data: IUser): Promise<IUser> => usersRepo.create(data);

/**
 * Update corresponding user (finds user by id) with data. 
 * Returns updated user or Throws error, if user doesn't exist
 * @param id id of user string
 * @param data data for updating an existing user IUser
 * @returns updated user IUser
 */
const update = async (id: string, data: IUser) => usersRepo.update(id, data);

/**
 * Delete corresponding user (finds user by id). 
 * Throws error, if user doesn't exist
 * @param id id of user string
 * @returns void
 */
const remove = async (id: string) => usersRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
