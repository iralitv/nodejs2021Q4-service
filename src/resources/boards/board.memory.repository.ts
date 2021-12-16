import { IBoard } from './board.model';

const DB = require('../../database');

const TABLE = "Boards";

/**
 * Returns list of Boards or empty array
 * @returns list of Boards Array<IBoard> | []
 */
const getAll = (): Array<IBoard> => DB.getAllEntities(TABLE);

/**
 * Returns Board according to id or Throws error, if Board doesn't exist
 * @param id id of Board string
 * @returns Board item IBoard
 */
const getById = (id: string): IBoard => {
  const board: IBoard = DB.getEntityById(TABLE, id);

  if (!board) {
    throw new Error(`Board with id ${id} not found`);
  }

  return board;
}

/**
 * Create Board with data. Returns created Board
 * @param data data for creating a new Board IBoard
 * @returns created Board IBoard
 */
const create = (data: IBoard): IBoard => DB.createEntity(TABLE, data);

/**
 * Update corresponding Board (finds Board by id) with data. Returns updated Board or Throws error, if Board doesn't exist
 * @param id id of Board string
 * @param data data for updating a new Board IBoard
 * @returns updated Board IBoard
 */
const update = (id: string, data: IBoard): IBoard => {
  const updatedBoard: IBoard = DB.updateEntity(TABLE, id, data);
  
  if (!updatedBoard) {
    throw new Error(`Board with id ${id} not found`);
  }

  return updatedBoard;
};

/**
 * Delete corresponding Board (finds Board by id). Throws error, if Board doesn't exist
 * @param id id of Board string
 * @returns void
 */
const remove = (id: string): void => {
  const board: IBoard = DB.getEntityById(TABLE, id);

  if (!board) {
    throw new Error(`Board with id ${id} not found`);
  }

  DB.removeEntity(TABLE, id);
}

module.exports = { getAll, getById, create, update, remove };
