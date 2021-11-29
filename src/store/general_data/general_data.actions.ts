import { IDayOfWeek } from './../../types/models/IDayOfWeek';
import { ILesson } from './../../types/models/ILesson';
import { IGroup } from './../../types/models/IGroup';
import { ITeacher } from './../../types/models/ITeacher';
import {
  SET_DISCIPLINES,
  SET_TEACHERS,
  SET_GROUPS,
  SET_CLASSROOMS,
  SET_LESSONS,
  SET_DAYS_OF_WEEK,
  SET_SELECTED_GROUP_ID,
} from './general_data.const';
import { IDiscipline } from '../../types/models/IDiscipline';
import { IClassRoom } from '../../types/models';

interface IReturnActionType<T> {
  type: string;
  payload: T;
}

export const setDisciplines = (payload: IDiscipline[]): IReturnActionType<IDiscipline[]> => ({
  type: SET_DISCIPLINES as typeof SET_DISCIPLINES,
  payload,
});

export const setTeachers = (payload: ITeacher[]): IReturnActionType<ITeacher[]> => ({
  type: SET_TEACHERS as typeof SET_TEACHERS,
  payload,
});

export const setGroups = (payload: IGroup[]): IReturnActionType<IGroup[]> => ({
  type: SET_GROUPS as typeof SET_GROUPS,
  payload,
});

export const setClassRooms = (payload: IClassRoom[]): IReturnActionType<IClassRoom[]> => ({
  type: SET_CLASSROOMS as typeof SET_CLASSROOMS,
  payload,
});

export const setLessons = (payload: ILesson[]): IReturnActionType<ILesson[]> => ({
  type: SET_LESSONS as typeof SET_LESSONS,
  payload,
});

export const setDayOfWeek = (payload: IDayOfWeek[]): IReturnActionType<IDayOfWeek[]> => ({
  type: SET_DAYS_OF_WEEK as typeof SET_DAYS_OF_WEEK,
  payload,
});

export const setSelectedGroupId = (payload: number): IReturnActionType<number> => ({
  type: SET_SELECTED_GROUP_ID as typeof SET_SELECTED_GROUP_ID,
  payload,
});
