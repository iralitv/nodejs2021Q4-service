import { IUser } from './resources/users/user.model';
import { IBoard } from './resources/boards/board.model';
import { ITask } from './resources/tasks/task.model';

type TableDataItemType = IUser | IBoard | ITask;

type DBType = {
  Users: Array<IUser> | [],
  Boards: Array<IBoard> | [],
  Tasks: Array<ITask> | [],
}

type DBServicesType = {
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
}

// const dbServices: DBServicesType = {
//   /**
//    * Set null value for all Tasks for user
//    * @param user entity to be deleted IUser
//    * @returns void
//    */
//   removeUsersService: (user: TableDataItemType) => {
//     const updatedTasks = db.Tasks.map(task => {
//       if (task.userId === user.id) {
//         return { ...task, userId: null }
//       }

//       return task;
//     });

//     db.Tasks = updatedTasks;
//   },
//   /**
//    * Remove all Tasks of board
//    * @param board entity to be deleted IBoard
//    * @returns void
//    */
//   removeBoardsService: (board: TableDataItemType) => {
//     if (board) {
//       const filteredTasks = db.Tasks.filter((task: ITask) => task.boardId !== board.id);

//       db.Tasks = filteredTasks;
//     }
//   },
//   /**
//    * TBD: something for task related object 
//    * @returns void
//    */
//   removeTasksService: () => {
//     // do nothing
//   },
// }

/**
   * Returns all records of table
   * @param table name of DB table TableDataNameType
   * @returns list of all entities of corresponding table Array<TableDataItemType>
   */
const getAllEntities = (table: TableDataNameType): Array<TableDataItemType> => db[table];

/**
 * Returns entity of table according to id
 * @param table name of DB table TableDataNameType
 * @param id id of entity string
 * @returns entity of table according to id or undefined if there is no suitable entity Array<TableDataItemType> | undefined
 */
const getEntityById = (table: TableDataNameType, id?: string): TableDataItemType | undefined  => {
  const array: Array<(IUser | IBoard| ITask)> = [...db[table]];
  return array.find((entity: TableDataItemType) => entity.id === id)
}

/**
 * Create a new entity of table according with data
 * @param table name of DB table TableDataNameType
 * @param data data for creating a new entity TableDataItemType
 * @returns a new entity of table according with data Array<TableDataItemType> | undefined
 */
const createEntity = (table: TableDataNameType, data: TableDataItemType): TableDataItemType | undefined => {
  db[table].push(data as never);

  return getEntityById(table, data.id);
}

/**
 * Update an existing entity of table according with data
 * @param table name of DB table TableDataNameType
 * @param id id of existing entity for updating TableDataItemType
 * @param data data for updating an existing entity TableDataItemType
 * @returns an updated entity of table according with data or undefined if there is no suitable entity Array<TableDataItemType> | undefined
 */
const updateEntity = (table: TableDataNameType, id: string, data: TableDataItemType): TableDataItemType | undefined => {
  const old = getEntityById(table, id);

  if (old) {
    const index: number = db[table].findIndex((entity: TableDataItemType) => entity.id === old.id)
    db[table][index] = { ...data, id };
  }

  return getEntityById(table, id);
};


/**
 * Remove an existing entity of table according with data; 
 * Execute methods of dbServices object for updating / deleting of related entites
 * @param table name of DB table TableDataNameType
 * @param id id of existing entity for deleting TableDataItemType
 * @returns void
 */
const removeEntity = (table: TableDataNameType, id: string): void => {
  const entity = getEntityById(table, id) || {};

  // dbServices[`remove${table}Service`](entity);

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
