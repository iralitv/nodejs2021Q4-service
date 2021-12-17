import { ITask } from './task.model';

export {};
const DB = require('../../database');

const TABLE = "Tasks";

/**
 * Returns list of Task filtered by Board id or empty array
 * @param boardId id of board for filtering Tasks string
 * @returns list of Task by Board id Array<ITask> | []
 */
const getAll = (boardId: string): Array<ITask> => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    throw new Error(`Board with id ${boardId} not found`);
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
const getById = (boardId: string, taskId: string): ITask => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    throw new Error(`Board with id ${boardId} not found`);
  }

  const task = DB.getEntityById(TABLE, taskId);

  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
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
const create = (boardId: string, data: ITask): ITask => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    throw new Error(`Board with id ${boardId} not found`);
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
const update = (boardId: string, taskId: string, data: ITask): ITask => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    throw new Error(`Board with id ${boardId} not found`);
  }
  
  const updatedTask = DB.updateEntity(TABLE, taskId, data);
  
  if (!updatedTask) {
    throw new Error(`Task with id ${taskId} not found`);
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
    throw new Error(`Task with id ${task} not found`);
  }

  DB.removeEntity(TABLE, taskId);
}

module.exports = { getAll, getById, create, update, remove };
