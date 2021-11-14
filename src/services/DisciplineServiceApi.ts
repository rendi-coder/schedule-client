import { IDiscipline } from './../types/models/IDiscipline';
import Api from './Api';

export class DisciplineApiService extends Api {
  async getDisciplines(): Promise<IDiscipline[]> {
    const { data } = await this.apiClient.get<IDiscipline[]>(`/discipline/`);
    return data;
  }
}
