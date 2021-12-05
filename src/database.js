// const User = require("./resources/users/user.model");

const db = {
  Users: [
    {
        "id": "af987807-a8f3-4222-b098-fc52b4d31ef7",
        "name": "USER 1",
        "login": "user"
    },
    {
        "id": "6cfcf39f-2cfe-4338-9737-2b69d5e334b9",
        "name": "USER 2",
        "login": "user"
    },
    {
        "id": "ee37e3ad-396c-4e36-b3e5-cf2cf5303d6c",
        "name": "USER 3",
        "login": "user"
    }
],
  Boards: [],
  Tasks: [],
  removeUsersService: (user) => {
    const updatedTasks = db.Tasks.map(task => {
      if (task.userId === user.id) {
        return { ...task, userId: null }
      }

      return task;
    });

    db.Tasks = updatedTasks;
  },
  removeBoardsService: (board) => {
    if (board) {
      const filteredTasks = db.Tasks.filter(task => task.boardId !== board.id);

      db.Tasks = filteredTasks;
    }
  },
  removeTasksService: () => {
  },
}

// const initValues = () => {
//   for (let i = 0; i < 3; i += 1) {
//     db.Users.push(new User())
//   }
//   // to do for board and tasks
// };

// initValues();

const getAllEntities = table => db[table].filter(entity => entity);

const getEntityById = (table, id) => db[table].find(entity => entity.id === id);

const createEntity = (table, data) => {
  db[table].push(data);

  return getEntityById(table, data.id);
}

const updateEntity = (table, id, data) => {
  const old = getEntityById(table, id);

  if (old) {
    db[table][db[table].indexOf(old)] = { ...data, id };
  }

  return getEntityById(table, id);
};

const removeEntity = (table, id) => {
  const entity = getEntityById(table, id);

  db[`remove${table}Service`](entity);

  const index = db[table].findIndex((item) => item.id === id);
  db[table].splice(index, 1);
};

module.exports = {
  getAllEntities,
  getEntityById,
  createEntity,
  updateEntity,
  removeEntity,
};
