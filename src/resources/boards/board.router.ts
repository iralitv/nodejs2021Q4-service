export {};
const router = require('express').Router();
const { responceWrapper } = require('../../error');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    res.status(200).send(Board.toResponse(board));
  })
});

router.route('/').post(async (req, res) => {
  responceWrapper(res, async () => {
    const board = await boardsService.create(Board.fromRequest(req.body));
    res.status(201).send(Board.toResponse(board));
  })
})

router.route('/:id').put(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const board = await boardsService.update(id, Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(board));
  })
})

router.route('/:id').delete(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    await boardsService.remove(id);
    res.status(204).send();
  })
})

module.exports = router;
