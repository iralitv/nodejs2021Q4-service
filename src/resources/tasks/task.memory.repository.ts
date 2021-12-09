import { ITask } from './task.model';

export {};
const DB = require('../../database');

const TABLE = "Tasks";

const getAll = (boardId: string): Array<ITask> => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    throw new Error(`Board with id ${boardId} not found`);
  }

  return DB.getAllEntities(TABLE);
}

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

const create = (boardId: string, data: ITask): ITask => {
  const board = DB.getEntityById('Boards', boardId);

  if (!board) {
    throw new Error(`Board with id ${boardId} not found`);
  }

  return DB.createEntity(TABLE, data);
}

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

const remove = (taskId: string) => {
  const task = DB.getEntityById(TABLE, taskId);

  if (!task) {
    throw new Error(`Task with id ${task} not found`);
  }

  DB.removeEntity(TABLE, taskId);
}

module.exports = { getAll, getById, create, update, remove };
