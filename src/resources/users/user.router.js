const router = require('express').Router();
const { responceWrapper } = require('../../error');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const user = await usersService.getById(id);
    res.status(200).send(User.toResponse(user));
  })
});

router.route('/').post(async (req, res) => {
  responceWrapper(res, async () => {
    const user = await usersService.create(User.fromRequest(req.body));
    res.status(201).send(User.toResponse(user));
  })
})

router.route('/:id').put(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    const user = await usersService.update(id, User.fromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  })
})

router.route('/:id').delete(async (req, res) => {
  responceWrapper(res, async () => {
    const { id } = req.params;
    await usersService.remove(id);
    res.status(204).send();
  })
})

module.exports = router;
