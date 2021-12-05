const router = require('express').Router();
const { responceWrapper } = require('../../error');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const users = await boardsService.getAll();
  res.json(users.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const user = await boardsService.getById(id);
    res.status(200).send(Board.toResponse(user));
  })
});

router.route('/').post(async (req, res) => {
  responceWrapper(res, async () => {
    const user = await boardsService.create(Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(user));
  })
})

router.route('/:id').put(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const user = await boardsService.update(id, Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(user));
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
