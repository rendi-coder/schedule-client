import { IUser } from '../models';

export interface IAuthData {
  token: string;
  user: IUser;
}
