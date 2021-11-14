import { IClassRoom } from '../types/models';
import Api from './Api';

export class ClassRoomApiService extends Api {
  async getClassRooms(): Promise<IClassRoom[]> {
    const { data } = await this.apiClient.get<IClassRoom[]>(`/classRoom/`);
    return data;
  }
}
