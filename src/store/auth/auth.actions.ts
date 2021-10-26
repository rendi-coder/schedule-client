import { IUser } from '../../types/models';
import { LOGIN, LOGOUT } from './auth.const';

export const login = (token: string, user: IUser) => ({
  type: LOGIN as typeof LOGIN,
  token,
  user,
});

export const logout = () => ({
  type: LOGOUT as typeof LOGOUT,
});
