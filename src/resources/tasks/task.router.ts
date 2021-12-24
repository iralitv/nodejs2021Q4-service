import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';
import { responceWrapper } from '../../error/errorHandler';

export {};
const router = require('express').Router({mergeParams: true});
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, async () => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    if (typeof tasks === 'string') {
      next(ApiError.badRequest(`Board with id ${boardId} not found`));
      return;
    }

    res.json(tasks);
  })
});

router.route('/:taskId').get(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, async () => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
  
    if (typeof task === 'string') {
      next(ApiError.badRequest(`${task} with id ${task === 'Task' ? taskId : boardId} not found`));
      return;
    }
  
    res.status(200).send(task);
  })
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, async () => {
    const { boardId } = req.params;
    const task = await tasksService.create(boardId, Task.fromRequest({ ...req.body, boardId }));
  
    if (typeof task === 'string') {
      next(ApiError.badRequest(`Board with id ${boardId} not found`));
      return;
    }
  
    res.status(201).send(task);
  })
});

router.route('/:taskId').put(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, async () => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.update(boardId, taskId, Task.fromRequest({ ...req.body, boardId }));
  
    if (typeof task === 'string') {
      next(ApiError.badRequest(`${task} with id ${task === 'Task' ? taskId : boardId} not found`));
      return;
    }
  
    res.status(200).send(task);
  })
});

router.route('/:taskId').delete(async (req: Request, res: Response) => {
  responceWrapper(res, async () => {
    const { taskId } = req.params;
    await tasksService.remove(taskId);
    res.status(204).send();
  })
});

module.exports = router;
