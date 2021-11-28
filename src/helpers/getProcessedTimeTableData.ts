import { IArticle, ITimeTable } from '../types/models';

export type TProcessedTimeTable = {
  id: number;
  lesson: { title: string; number: number; id: number };
  classRoom: { title: string; id: number };
  discipline: { title: string; id: number };
  teacher: { title: string; id: number };
  articles: IArticle[];
};

export interface IGetProcessedTimeTableDataResponse {
  dayOfWeek: string;
  lessons: TProcessedTimeTable[];
}

export const getProcessedTimeTableData = (
  timeTable: ITimeTable[]
): IGetProcessedTimeTableDataResponse[] => {
  const processedTimeTable: { [dayOfWeek: number]: Array<TProcessedTimeTable> } = {
    [1]: [],
    [2]: [],
    [3]: [],
    [4]: [],
    [5]: [],
  };

  const parseData = ({
    id,
    lesson,
    classRoom,
    discipline,
    teacher,
    articles,
  }: ITimeTable): TProcessedTimeTable => ({
    id,
    lesson: {
      title: `${lesson.startTime + '-' + lesson.endTime}`,
      number: lesson.number,
      id: lesson.id,
    },
    classRoom: { title: classRoom.code, id: classRoom.id },
    discipline: { title: discipline.name, id: discipline.id },
    teacher: { title: `${teacher.surname} ${teacher.name}`, id: teacher.id },
    articles,
  });

  timeTable.forEach((item) => {
    processedTimeTable[item.dayOfWeek.dayOfWeek].push(parseData(item));
  });

  return Object.keys(processedTimeTable).map((key) => ({
    dayOfWeek: days[+key - 1],
    lessons: processedTimeTable[+key],
  }));
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
