import { TeachersApiService } from './TeachersServiceApi';
import { AuthServiceApi } from './AuthServiceApi';
import { GroupApiService } from './GroupApiService';
import { TimeTableApiService } from './TimeTableServiceApi';

export default {
  auth: new AuthServiceApi(),
  group: new GroupApiService(),
  teachers: new TeachersApiService(),
  timeTable: new TimeTableApiService(),
};
