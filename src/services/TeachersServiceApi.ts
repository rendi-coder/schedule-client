import Api from './Api';
import { ITeacher } from '../types/models/ITeacher';
import { ICreateTeacherBody } from '../types/request/ICreateTeacherBody';

export class TeachersApiService extends Api {
  async getTeachers(): Promise<ITeacher[]> {
    const { data } = await this.apiClient.get<ITeacher[]>(`/teacher/`);
    return data;
  }
  async createTeacher(payload: ICreateTeacherBody): Promise<ITeacher> {
    const { data } = await this.apiClient.post<ICreateTeacherBody, ITeacher>(
      `/teacher/createTeacher`,
      payload
    );
    return data;
  }
}
