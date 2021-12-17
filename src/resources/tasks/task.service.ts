import { ITask } from './task.model';

export {};
const tasksRepo = require('./task.memory.repository');

/**
 * Returns list of Task filtered by Board id or empty array
 * @param boardId id of board for filtering Tasks string
 * @returns list of Task by Board id Array<ITask> | []
 */
const getAll = async (boardId: string): Promise<Array<ITask>> => tasksRepo.getAll(boardId);

/**
 * Returns Task according to taskId and boardId 
 * or Throws error, if Board or Task doesn't exist
 * @param boardId id of Board string
 * @param taskId id of Task string
 * @returns task item ITask
 */
const getById = async (boardId: string, taskId: string): Promise<ITask> => tasksRepo.getById(boardId, taskId);

/**
 * Create task with data. Returns created Task
 * or Throws error, if Board doesn't exist
 * @param boardId id of board in which task is located string
 * @param data data for creating a new task ITask
 * @returns created task ITask
 */
const create = async (boardId: string, data: ITask): Promise<ITask> => tasksRepo.create(boardId, data);

/**
 * Update task (finds task by id) with data. 
 * Returns updated task 
 * or Throws error, if Board or Task doesn't exist
 * @param boardId id of Board string
 * @param taskId id of Task string
 * @param data data for updating an existing task ITask
 * @returns updated task ITask
 */
const update = async (boardId: string, taskId: string, data: ITask): Promise<ITask> => tasksRepo.update(boardId, taskId, data);

/**
 * Delete corresponding Task (finds Task by id). 
 * Throws error, if Task doesn't exist
 * @param taskId id of task string
 * @returns void
 */
const remove = async (taskId: string) => tasksRepo.remove(taskId);

module.exports = { getAll, getById, create, update, remove };
