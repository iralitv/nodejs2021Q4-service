import { IUser } from './resources/users/user.model';
import { IBoard } from './resources/boards/board.model';
import { ITask } from './resources/tasks/task.model';

type TableDataItemType = IUser | IBoard | ITask;

type DBType = {
  Users: Array<IUser> | [],
  Boards: Array<IBoard> | [],
  Tasks: Array<ITask> | [],
  removeUsersService: (user: TableDataItemType) => void;
  removeBoardsService: (board: TableDataItemType) => void;
  removeTasksService: (task?: TableDataItemType) => void;
}

type TableDataNameType = 'Users' | 'Boards' | 'Tasks';

const db: DBType = {
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
      const filteredTasks = db.Tasks.filter((task: ITask) => task.boardId !== board.id);

      db.Tasks = filteredTasks;
    }
  },
  removeTasksService: () => {
    // do nothing
  },
}

const getAllEntities = (table: TableDataNameType) => db[table].filter((entity: TableDataItemType) => entity);

const getEntityById = (table: TableDataNameType, id: string) => db[table].find((entity: TableDataItemType) => entity.id === id);

const createEntity = (table: TableDataNameType, data: TableDataItemType) => {
  db[table].push(data as never);

  return getEntityById(table, data.id);
}

const updateEntity = (table: TableDataNameType, id: string, data: TableDataItemType) => {
  const old = getEntityById(table, id);

  if (old) {
    const index: number = db[table].findIndex((entity: TableDataItemType) => entity.id === old.id)
    db[table][index] = { ...data, id };
  }

  return getEntityById(table, id);
};

const removeEntity = (table: TableDataNameType, id: string) => {
  const entity = getEntityById(table, id);

  db[`remove${table}Service`](entity);

  const index = db[table].findIndex((item: TableDataItemType) => item.id === id);
  db[table].splice(index, 1);
};

module.exports = {
  getAllEntities,
  getEntityById,
  createEntity,
  updateEntity,
  removeEntity,
};
