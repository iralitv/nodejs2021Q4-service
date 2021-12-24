import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';
import { responceWrapper } from '../../error/errorHandler';

export {};
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req: Request, res: Response) => {
  responceWrapper(res, req, async () => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, req, async () => {
    const { id } = req.params;
    const user = await usersService.getById(id);
  
    if (!user) {
      next(ApiError.badRequest(`User with id ${id} not found`));
      return;
    }
  
    res.status(200).send(User.toResponse(user));
  })
});

router.route('/').post(async (req: Request, res: Response) => {
  responceWrapper(res, req, async () => {
    const user = await usersService.create(User.fromRequest(req.body));

    res.status(201).send(User.toResponse(user));
  })
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
  responceWrapper(res, req, async () => {
    const { id } = req.params;
    const user = await usersService.update(id, User.fromRequest(req.body));

    if (!user) {
      next(ApiError.badRequest(`User with id ${id} not found`));
      return;
    }

    res.status(200).send(User.toResponse(user));
  })
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  responceWrapper(res, req, async () => {
    const { id } = req.params;
    await usersService.remove(id);
  
    res.status(204).send();
  })
});

module.exports = router;
