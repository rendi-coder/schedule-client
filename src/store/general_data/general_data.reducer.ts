import { IGeneralDataState, TGeneralDataAction } from './general_data.types';
import { Reducer } from 'redux';

import {
  SET_CLASSROOMS,
  SET_DISCIPLINES,
  SET_TEACHERS,
  SET_GROUPS,
  SET_LESSONS,
  SET_DAYS_OF_WEEK,
} from './general_data.const';
import {
  setDisciplines,
  setTeachers,
  setClassRooms,
  setGroups,
  setLessons,
  setDayOfWeek,
} from './general_data.actions';

const initialState = {
  disciplines: [],
  teachers: [],
  groups: [],
  classRooms: [],
  lessons: [],
  daysOfWeek: [],
};

export const GeneralDataReducer: Reducer<IGeneralDataState, TGeneralDataAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_DISCIPLINES: {
      const { payload } = action as ReturnType<typeof setDisciplines>;
      return {
        ...state,
        disciplines: payload,
      };
    }
    case SET_TEACHERS: {
      const { payload } = action as ReturnType<typeof setTeachers>;
      return {
        ...state,
        teachers: payload,
      };
    }
    case SET_CLASSROOMS: {
      const { payload } = action as ReturnType<typeof setClassRooms>;
      return {
        ...state,
        classRooms: payload,
      };
    }
    case SET_GROUPS: {
      const { payload } = action as ReturnType<typeof setGroups>;
      return {
        ...state,
        groups: payload,
      };
    }
    case SET_LESSONS: {
      const { payload } = action as ReturnType<typeof setLessons>;
      return {
        ...state,
        lessons: payload,
      };
    }
    case SET_DAYS_OF_WEEK: {
      const { payload } = action as ReturnType<typeof setDayOfWeek>;
      return {
        ...state,
        daysOfWeek: payload,
      };
    }
    default:
      return state;
  }
};
