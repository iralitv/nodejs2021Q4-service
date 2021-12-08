const { v4: uuidv4 } = require('uuid');

interface IBoard {
  id: string;
  title: string;
  columns: Array<IColumn>;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

class Board {
  id: string;
  title: string;
  columns: Array<IColumn>;

  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static fromRequest(body: IBoard): IBoard {
    return new Board(body);
  }
}

module.exports = Board;
