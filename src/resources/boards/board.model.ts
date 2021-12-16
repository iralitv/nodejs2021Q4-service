import {v4 as uuidv4 } from 'uuid';

interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IBoard {
  id: string;
  title: string;
  columns: Array<IColumn> | [];
}

class Board {
  id: string;

  title: string;

  columns: Array<IColumn>;

  constructor({
    id = uuidv4(),
    title = 'BOARD',
    columns = [],
  }: IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Returns formatted props for Boards to put them in the request body
   * @param board props of board IBoard
   * @returns Formatted entity of Board IBoard
   */
  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  /**
   * Returns formatted props for Boards from response body
   * @param body props of board from responce IBoard
   * @returns Formatted entity of Board IBoard
   */
  static fromRequest(body: IBoard): IBoard {
    return new Board(body);
  }
}

module.exports = Board;
