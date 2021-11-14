import { ITimeTable } from '../types/models';

type TProcessedTimeTable = {
  lesson: { title: string; number: number };
  classRoom: string;
  discipline: string;
  teacher: string;
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
    lesson,
    classRoom,
    discipline,
    teacher,
  }: ITimeTable): TProcessedTimeTable => ({
    lesson: { title: `${lesson.startTime + '-' + lesson.endTime}`, number: lesson.number },
    classRoom: classRoom.code,
    discipline: discipline.name,
    teacher: `${teacher.surname} ${teacher.name}`,
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
