import { IDayOfWeek } from './../types/models/IDayOfWeek';
import Api from './Api';

export class DayOfWeekApiService extends Api {
  async getDaysOfWeek(): Promise<IDayOfWeek[]> {
    const { data } = await this.apiClient.get<IDayOfWeek[]>(`/dayOfWeek/`);
    return data;
  }
}
