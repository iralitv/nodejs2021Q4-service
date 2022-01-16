import { getRepository } from 'typeorm';
import { Board } from '../../entity/Board';
import { IBoard } from './board.model';

// const DB = require('../../database');

// const TABLE = "Boards";
const boardRepo = getRepository(Board);
/**
 * Returns list of Boards or empty array
 * @returns list of Boards Array<IBoard> | []
 */
const getAll = (): Promise<IBoard[]> => boardRepo.find();

/**
 * Returns Board according to id or Throws error, if Board doesn't exist
 * @param id id of Board string
 * @returns Board item IBoard
 */
const getById = (id: string): Promise<IBoard> => boardRepo.findOne(id);

/**
 * Create Board with data. Returns created Board
 * @param data data for creating a new Board IBoard
 * @returns created Board IBoard
 */
const create = (data: IBoard): Promise<IBoard> => {
  const board = new Board();
  const { title } = data;
  board.title = title;

  return boardRepo.save(board);
}

/**
 * Update corresponding Board (finds Board by id) with data. Returns updated Board or Throws error, if Board doesn't exist
 * @param id id of Board string
 * @param data data for updating an existing Board IBoard
 * @returns updated Board IBoard
 */
const update = (id: string, data: IBoard): Promise<IBoard> => {
  boardRepo.update(id, { ...data });
  return boardRepo.findOne(id);
};

/**
 * Delete corresponding Board (finds Board by id). Throws error, if Board doesn't exist
 * @param id id of Board string
 * @returns void
 */
const remove = (id: string) => {
  const board: Promise<IBoard> = boardRepo.findOne(id);

  if (!board) {
    return;
  }

  boardRepo.delete(id)
}

module.exports = { getAll, getById, create, update, remove };
