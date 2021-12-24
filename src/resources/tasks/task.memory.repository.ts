import { ITask } from './task.model';

export {};
const DB = require('../../database');

const TABLE = "Tasks";

export const ERROR_SOURCE: {[key: string]: string} = {
  BOARD: 'Board',
  TASK: 'Task',
}

/**
 * Returns list of Task filtered by Board id or empty array
 * @param boardId id of board for filtering Tasks string
 * @returns list of Task by Board id Array<ITask> | []
 */
const getAll = (boardId: string): Array<ITask> | string => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  return DB.getAllEntities(TABLE);
}

/**
 * Returns Task according to taskId and boardId 
 * or Throws error, if Board or Task doesn't exist
 * @param boardId id of Board string
 * @param taskId id of Task string
 * @returns task item ITask
 */
const getById = (boardId: string, taskId: string): ITask | string => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  const task = DB.getEntityById(TABLE, taskId);

  if (!task) {
    return ERROR_SOURCE.TASK;
  }

  return task;
}

/**
 * Create task with data. Returns created Task
 * or Throws error, if Board doesn't exist
 * @param boardId id of board in which task is located string
 * @param data data for creating a new task ITask
 * @returns created task ITask
 */
const create = (boardId: string, data: ITask): ITask | string => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  return DB.createEntity(TABLE, data);
}

/**
 * Update task (finds task by id) with data. 
 * Returns updated task 
 * or Throws error, if Board or Task doesn't exist
 * @param boardId id of Board string
 * @param taskId id of Task string
 * @param data data for updating an existing task ITask
 * @returns updated task ITask
 */
const update = (boardId: string, taskId: string, data: ITask): ITask | string => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }
  
  const updatedTask = DB.updateEntity(TABLE, taskId, data);
  
  if (!updatedTask) {
    return ERROR_SOURCE.TASK;
  }

  return updatedTask;
};

/**
 * Delete corresponding Task (finds Task by id). 
 * Throws error, if Task doesn't exist
 * @param taskId id of task string
 * @returns void
 */
const remove = (taskId: string) => {
  const task = DB.getEntityById(TABLE, taskId);

  if (!task) {
    return;
  }

  DB.removeEntity(TABLE, taskId);
}

module.exports = { getAll, getById, create, update, remove };
