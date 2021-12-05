const router = require('express').Router({mergeParams: true});
const { responceWrapper } = require('../../error');
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  responceWrapper(res, async () => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
    res.status(200).send(task);
  })
});

router.route('/').post(async (req, res) => {
  responceWrapper(res, async () => {
    const { boardId } = req.params;
    const task = await tasksService.create(boardId, Task.fromRequest({ ...req.body, boardId }));
    res.status(201).send(task);
  })
})

router.route('/:taskId').put(async (req, res) => {
  responceWrapper(res, async () => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.update(boardId, taskId, Task.fromRequest({ ...req.body, boardId }));
    res.status(200).send(task);
  })
})

router.route('/:taskId').delete(async (req, res) => {
  responceWrapper(res, async () => {
    const { taskId } = req.params;
    await tasksService.remove(taskId);
    res.status(204).send();
  })
})

module.exports = router;
