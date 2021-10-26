import { ILoginRequest } from '../types/request/ILoginRequest';
import { IAuthData } from '../types/response/IAuthData';
import Api from './Api';

export class AuthServiceApi extends Api {
  async login(login: string, password: string) {
    const { data: auth } = await this.apiClient.post<ILoginRequest, IAuthData>('/auth/login', {
      login,
      password,
    });

    return auth;
  }
}
