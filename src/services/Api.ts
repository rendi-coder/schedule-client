import { ApiClient } from './ApiClient';

export default class Api {
  protected apiClient;

  constructor() {
    this.apiClient = ApiClient.Instance;
  }
}
