import { IGroup } from './../types/models/IGroup';
import Api from './Api';

export class GroupApiService extends Api {
  async getGroups(): Promise<IGroup[]> {
    const { data } = await this.apiClient.get<IGroup[]>(`/group/`);
    return data;
  }
}
