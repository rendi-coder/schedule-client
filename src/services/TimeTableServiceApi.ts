import { ITimeTable } from './../types/models/ITimeTable';
import Api from './Api';

export class TimeTableApiService extends Api {
  async getTimeTable() {
    const { data } = await this.apiClient.get<ITimeTable[]>(`/timeTable`);
    return data;
  }

  async getTimeTableByGroup(groupId: number) {
    const { data } = await this.apiClient.get<ITimeTable[]>(`/timeTable/group/${groupId}`);
    return data;
  }
}
