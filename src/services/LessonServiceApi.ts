import { ILesson } from './../types/models/ILesson';
import Api from './Api';

export class LessonApiService extends Api {
  async getLessons(): Promise<ILesson[]> {
    const { data } = await this.apiClient.get<ILesson[]>(`/lesson/`);
    return data;
  }
}
