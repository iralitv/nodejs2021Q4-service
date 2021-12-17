import { IBoard } from './board.model';

export {};
const boardsRepo = require('./board.memory.repository');

/**
 * Returns list of Boards or empty array
 * @returns list of Boards Array<IBoard> | []
 */
const getAll = async (): Promise<Array<IBoard>> => boardsRepo.getAll();

/**
 * Returns Board according to id
 * @param id id of Board string
 * @returns Board item IBoard
 */
const getById = async (id: string): Promise<IBoard> => boardsRepo.getById(id);

/**
 * Create Board with data. Returns created Board
 * @param data data for creating a new Board IBoard
 * @returns created Board IBoard
 */
const create = async (data: IBoard): Promise<IBoard> => boardsRepo.create(data);

/**
 * Update corresponding Board (finds Board by id) with data. Returns updated Board
 * @param id id of Board string
 * @param data data for updating a new Board IBoard
 * @returns updated Board IBoard
 */
const update = async (id: string, data: IBoard): Promise<IBoard> => boardsRepo.update(id, data);

/**
 * Delete corresponding Board (finds Board by id)
 * @param id id of Board string
 * @returns void
 */
const remove = async (id: string) => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
