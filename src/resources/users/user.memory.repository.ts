export {};
const DB = require('../../database');

const TABLE = "Users";

const getAll = () => DB.getAllEntities(TABLE);

const getById = (id) => {
  const user = DB.getEntityById(TABLE, id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  return user;
}

const create = (data) => DB.createEntity(TABLE, data);

const update = (id, data) => {
  const updatedUser = DB.updateEntity(TABLE, id, data);
  
  if (!updatedUser) {
    throw new Error(`User with id ${id} not found`);
  }

  return updatedUser;
};

const remove = (id) => {
  const user = DB.getEntityById(TABLE, id);

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  DB.removeEntity(TABLE, id);
}

module.exports = { getAll, getById, create, update, remove };
