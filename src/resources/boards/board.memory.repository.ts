import { IBoard } from './board.model';

const DB = require('../../database');

const TABLE = "Boards";

const getAll = (): Array<IBoard> => DB.getAllEntities(TABLE);

const getById = (id: string): IBoard => {
  const board: IBoard = DB.getEntityById(TABLE, id);

  if (!board) {
    throw new Error(`Board with id ${id} not found`);
  }

  return board;
}

const create = (data: IBoard): IBoard => DB.createEntity(TABLE, data);

const update = (id: string, data: IBoard): IBoard => {
  const updatedBoard: IBoard = DB.updateEntity(TABLE, id, data);
  
  if (!updatedBoard) {
    throw new Error(`Board with id ${id} not found`);
  }

  return updatedBoard;
};

const remove = (id: string): void => {
  const board: IBoard = DB.getEntityById(TABLE, id);

  if (!board) {
    throw new Error(`Board with id ${id} not found`);
  }

  DB.removeEntity(TABLE, id);
}

module.exports = { getAll, getById, create, update, remove };
