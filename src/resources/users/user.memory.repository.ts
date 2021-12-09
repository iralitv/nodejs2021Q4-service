import { IUser } from './user.model';

export {};
const DB = require('../../database');

const TABLE = "Users";

const getAll = (): Array<IUser> => DB.getAllEntities(TABLE);

const getById = (id: string): IUser => {
  const user = DB.getEntityById(TABLE, id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  return user;
}

const create = (data: IUser) => DB.createEntity(TABLE, data);

const update = (id: string, data: IUser): IUser => {
  const updatedUser: IUser = DB.updateEntity(TABLE, id, data);
  
  if (!updatedUser) {
    throw new Error(`User with id ${id} not found`);
  }

  return updatedUser;
};

const remove = (id: string) => {
  const user: IUser = DB.getEntityById(TABLE, id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  DB.removeEntity(TABLE, id);
}

module.exports = { getAll, getById, create, update, remove };
