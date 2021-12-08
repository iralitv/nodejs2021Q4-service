export {};
const tasksRepo = require('./task.memory.repository');

const getAll = async (boardId) => tasksRepo.getAll(boardId);

const getById = async (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = async (boardId, data) => tasksRepo.create(boardId, data);

const update = async (boardId, taskId, data) => tasksRepo.update(boardId, taskId, data);

const remove = async (taskId) => tasksRepo.remove(taskId);

module.exports = { getAll, getById, create, update, remove };
