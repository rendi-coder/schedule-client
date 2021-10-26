import { IUser } from '../../types/models';
import { login, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  user: IUser | null;
}

export type AuthAction = ReturnType<typeof login> | ReturnType<typeof logout>;
