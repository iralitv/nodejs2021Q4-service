import { IBoard } from './board.model';

export {};
const boardsRepo = require('./board.memory.repository');

const getAll = async (): Promise<Array<IBoard>> => boardsRepo.getAll();

const getById = async (id: string): Promise<IBoard> => boardsRepo.getById(id);

const create = async (data: IBoard): Promise<IBoard> => boardsRepo.create(data);

const update = async (id: string, data: IBoard): Promise<IBoard> => boardsRepo.update(id, data);

const remove = async (id: string) => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
