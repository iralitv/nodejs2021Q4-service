import { v4 as uuidv4 } from 'uuid';

export {};
export interface IUser {
  id: string;
  name: string;
  login: string;
  password?: string;
}
class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns formatted props for user (without password field) 
   * to put them in the request body
   * @param user props of user IUser
   * @returns Formatted entity of user IUser
   */
  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   * Returns formatted props for user from response body
   * @param body props of user from responce IUser
   * @returns Formatted entity of user IUser
   */
  static fromRequest(body: IUser): IUser {
    return new User(body);
  }
}

module.exports = User;
