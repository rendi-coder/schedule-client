import { IClassRoom } from './IClassRoom';
import { ITeacher } from './ITeacher';
import { IDiscipline } from './IDiscipline';
import { ILesson } from './ILesson';
import { IGroup } from './IGroup';
import { IDayOfWeek } from './IDayOfWeek';
import { IArticle } from '.';

export interface ITimeTable {
  id: number;
  dayOfWeek: IDayOfWeek;
  lesson: ILesson;
  group: IGroup;
  discipline: IDiscipline;
  teacher: ITeacher;
  classRoom: IClassRoom;
  articles: Array<IArticle>;
}
