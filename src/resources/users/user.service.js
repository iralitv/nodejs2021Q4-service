const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const getById = async (id) => usersRepo.getById(id);

const create = async (data) => usersRepo.create(data);

const update = async (id, data) => usersRepo.update(id, data);

const remove = async (id) => usersRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
