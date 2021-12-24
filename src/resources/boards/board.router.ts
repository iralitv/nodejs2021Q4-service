import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';
import { responceWrapper } from '../../error/errorHandler';

export {};
const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req: Request, res: Response) => {
  responceWrapper(res, async () => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
  
    if (!board) {
      next(ApiError.badRequest(`Board with id ${id} not found`));
      return;
    }
  
    res.status(200).send(Board.toResponse(board));
  })
});

router.route('/').post(async (req: Request, res: Response) => {
  responceWrapper(res, async () => {
    const board = await boardsService.create(Board.fromRequest(req.body));
    res.status(201).send(Board.toResponse(board));
  })
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const board = await boardsService.update(id, Board.fromRequest(req.body));
  
    if (!board) {
      next(ApiError.badRequest(`Board with id ${id} not found`));
      return;
    }
  
    res.status(200).send(Board.toResponse(board));
  })
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    await boardsService.remove(id);
  
    res.status(204).send();
  })
});

module.exports = router;
