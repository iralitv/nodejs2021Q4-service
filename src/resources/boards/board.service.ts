export {};
const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();

const getById = async (id) => boardsRepo.getById(id);

const create = async (data) => boardsRepo.create(data);

const update = async (id, data) => boardsRepo.update(id, data);

const remove = async (id) => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
