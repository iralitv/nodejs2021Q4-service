import { v4 as uuidv4 } from 'uuid';

export {};

export interface ITask {
  id?: string;
  title?: string;
  order?: number;
  description?: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 0,
    description = 'make people happier',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITask = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static fromRequest(body: ITask): ITask {
    return new Task(body);
  }
}

module.exports = Task;
