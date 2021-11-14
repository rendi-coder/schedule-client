import { ICreateTimeTable } from '../types/request/ICreateTimeTable';
import { ITimeTable } from './../types/models/ITimeTable';
import Api from './Api';

export class TimeTableApiService extends Api {
  async createTimeTable(payload: ICreateTimeTable): Promise<ITimeTable> {
    const { data } = await this.apiClient.post<ICreateTimeTable, ITimeTable>(
      `/timeTable/createTimeTable`,
      payload
    );
    return data;
  }

  async getTimeTable(): Promise<ITimeTable[]> {
    const { data } = await this.apiClient.get<ITimeTable[]>(`/timeTable`);
    return data;
  }

  async getTimeTableByGroup(groupId: number): Promise<ITimeTable[]> {
    const { data } = await this.apiClient.get<ITimeTable[]>(`/timeTable/group/${groupId}`);
    return data;
  }
}
