import { LessonApiService } from './LessonServiceApi';
import { TeachersApiService } from './TeachersServiceApi';
import { AuthServiceApi } from './AuthServiceApi';
import { GroupApiService } from './GroupApiService';
import { TimeTableApiService } from './TimeTableServiceApi';
import { DisciplineApiService } from './DisciplineServiceApi';
import { ClassRoomApiService } from './ClassRoomServiceApi';
import { DayOfWeekApiService } from './DayOfWeekServiceApi';

export default {
  auth: new AuthServiceApi(),
  group: new GroupApiService(),
  teachers: new TeachersApiService(),
  timeTable: new TimeTableApiService(),
  discipline: new DisciplineApiService(),
  classRoom: new ClassRoomApiService(),
  lesson: new LessonApiService(),
  dayOfWeek: new DayOfWeekApiService(),
};
