import { getRepository } from 'typeorm';
import { Board } from '../../entity/Board';
import { Task } from '../../entity/Task';
import { ITask } from './task.model';

// export {};
// const DB = require('../../database');

// const TABLE = "Tasks";

const boardRepo = getRepository(Board);
const taskRepo = getRepository(Task);

export const ERROR_SOURCE: {[key: string]: string} = {
  BOARD: 'Board',
  TASK: 'Task',
}

/**
 * Returns list of Task filtered by Board id or empty array
 * @param boardId id of board for filtering Tasks string
 * @returns list of Task by Board id Array<ITask> | []
 */
const getAll = (boardId: string): Promise<ITask[]> | string => {
  const board = boardRepo.findOne(boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  return taskRepo.find();
}

/**
 * Returns Task according to taskId and boardId 
 * or Throws error, if Board or Task doesn't exist
 * @param boardId id of Board string
 * @param taskId id of Task string
 * @returns task item ITask
 */
const getById = (boardId: string, taskId: string): Promise<ITask> | string => {
  const board = boardRepo.findOne(boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  const task = taskRepo.findOne(taskId);

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
const create = (boardId: string, data: ITask): Promise<ITask> | string => {
  const board = boardRepo.findOne(boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  const task = new Task();
  const { title, order, description, userId, boardId: taskBoardId, columnId } = data;

  task.title = title;
  task.order = order;
  task.description = description;
  task.userId = userId;
  task.boardId = taskBoardId;
  task.columnId = columnId;

  return taskRepo.save(task);
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
const update = (boardId: string, taskId: string, data: ITask): Promise<ITask> | string => {
  const board = boardRepo.findOne(boardId);

  if (!board) {
    return ERROR_SOURCE.BOARD;
  }

  const task = taskRepo.findOne(taskId);

  if (!task) {
    return ERROR_SOURCE.TASK;
  }

  taskRepo.update(taskId, { ...data });
  return taskRepo.findOne(taskId);
};

/**
 * Delete corresponding Task (finds Task by id). 
 * Throws error, if Task doesn't exist
 * @param taskId id of task string
 * @returns void
 */
const remove = (taskId: string) => {
  const task = taskRepo.findOne(taskId);

  if (!task) {
    return;
  }

  taskRepo.delete(taskId)
}

module.exports = { getAll, getById, create, update, remove };
