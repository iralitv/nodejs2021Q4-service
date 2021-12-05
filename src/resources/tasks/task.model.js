const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 0,
    description = 'make people happier',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
