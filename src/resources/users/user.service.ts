import { IUser } from './user.model';

export {};
const usersRepo = require('./user.memory.repository');

const getAll = async (): Promise<Array<IUser>> => usersRepo.getAll();

const getById = async (id: string): Promise<IUser> => usersRepo.getById(id);

const create = async (data: IUser): Promise<IUser> => usersRepo.create(data);

const update = async (id: string, data: IUser) => usersRepo.update(id, data);

const remove = async (id: string) => usersRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
