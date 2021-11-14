import { IDayOfWeek } from './../../types/models/IDayOfWeek';
import { ILesson } from './../../types/models/ILesson';
import { IGroup } from './../../types/models/IGroup';
import { ITeacher } from './../../types/models/ITeacher';
import { IDiscipline } from '../../types/models/IDiscipline';
import {
  setDisciplines,
  setTeachers,
  setGroups,
  setClassRooms,
  setLessons,
} from './general_data.actions';
import { IClassRoom } from '../../types/models';

export interface IGeneralDataState {
  disciplines: IDiscipline[];
  teachers: ITeacher[];
  groups: IGroup[];
  classRooms: IClassRoom[];
  lessons: ILesson[];
  daysOfWeek: IDayOfWeek[];
}

export type TGeneralDataAction =
  | ReturnType<typeof setDisciplines>
  | ReturnType<typeof setTeachers>
  | ReturnType<typeof setGroups>
  | ReturnType<typeof setClassRooms>
  | ReturnType<typeof setLessons>;
