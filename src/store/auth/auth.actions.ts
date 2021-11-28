import { IUser } from '../../types/models';
import { LOGIN, LOGOUT } from './auth.const';

export const login = (
  token: string,
  user: IUser
): { type: typeof LOGIN; token: string; user: IUser } => ({
  type: LOGIN as typeof LOGIN,
  token,
  user,
});

export const logout = (): { type: typeof LOGOUT } => ({
  type: LOGOUT as typeof LOGOUT,
});
