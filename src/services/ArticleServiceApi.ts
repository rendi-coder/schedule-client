import { IArticle } from '../types/models';
import Api from './Api';

export class ArticleApiService extends Api {
  async getArticlesByTimeTableId(id: number): Promise<IArticle[]> {
    const { data } = await this.apiClient.get<IArticle[]>(`/article/timetable/${id}`);
    return data;
  }
  async createArticle(article: Omit<IArticle, 'id'>): Promise<IArticle> {
    const { data } = await this.apiClient.post<Omit<IArticle, 'id'>, IArticle>(`/article`, article);
    return data;
  }
}
