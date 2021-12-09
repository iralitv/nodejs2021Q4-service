import { ITask } from './task.model';

export {};
const tasksRepo = require('./task.memory.repository');

const getAll = async (boardId: string): Promise<Array<ITask>> => tasksRepo.getAll(boardId);

const getById = async (boardId: string, taskId: string): Promise<ITask> => tasksRepo.getById(boardId, taskId);

const create = async (boardId: string, data: ITask): Promise<ITask> => tasksRepo.create(boardId, data);

const update = async (boardId: string, taskId: string, data: ITask): Promise<ITask> => tasksRepo.update(boardId, taskId, data);

const remove = async (taskId: string) => tasksRepo.remove(taskId);

module.exports = { getAll, getById, create, update, remove };
