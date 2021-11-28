import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import config from '../config/app';
import store from '../store';
import { logout } from '../store/auth/auth.actions';

export class ApiClient {
  private axios: AxiosInstance;

  private static instance: ApiClient;

  private constructor() {
    this.axios = axios.create({
      baseURL: config.apiOrigin,
    });

    this.axios.interceptors.request.use((cfg) => {
      // eslint-disable-next-line
      (cfg as any).headers.Authorization = `Bearer ${store.getState().auth.token}`;

      return cfg;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (store.getState().auth.token) {
            message.error('Your token is expired, please authorize again');
            store.dispatch(logout());
          }
        }

        throw error;
      }
    );
  }

  public static get Instance(): ApiClient {
    if (!this.instance) {
      this.instance = new ApiClient();
    }
    return this.instance;
  }

  get<T>(requestUrl: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.get(requestUrl, requestConfig);
  }

  post<T, R>(
    requestUrl: string,
    payload: T,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.axios.post(requestUrl, payload, requestConfig);
  }

  put<T, R>(
    requestUrl: string,
    payload: T,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.axios.put(requestUrl, payload, requestConfig);
  }

  delete<T>(requestUrl: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.delete(requestUrl, requestConfig);
  }
}
