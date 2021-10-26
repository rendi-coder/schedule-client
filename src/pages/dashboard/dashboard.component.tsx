import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Select, Spin, Table } from 'antd';
import Api from '../../services';
import * as Styles from './dashboard.styles';
import { filterOptionHandler } from '../../helpers/filterOptionHandler';
import { IGroup, ITimeTable } from '../../types/models';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

export const Dashboard: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [timeTable, setTimeTable] = useState<ITimeTable[]>([]);

  const getGroupsRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Api.group.getGroups();
      setGroups(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGroupsRequest();
  }, [getGroupsRequest]);

  const getTimeTable = useCallback(async (groupId: number) => {
    try {
      setLoading(true);
      const response = await Api.timeTable.getTimeTableByGroup(groupId);
      setTimeTable(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const onChangeGroup = useCallback(
    (groupId: SelectValue, option) => {
      getTimeTable(groupId as number);
    },
    [getTimeTable]
  );

  return (
    <Styles.Root>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a group"
        optionFilterProp="children"
        onChange={onChangeGroup}
        filterOption={filterOptionHandler}
      >
        {groups.map(({ id, name }) => (
          <Option value={id} key={name.toString()}>
            {name}
          </Option>
        ))}
      </Select>
      {!!timeTable.length && <TimeTable data={timeTable} />}
      <Styles.Loader>
        <Spin spinning={loading} size="large" tip={'Loading...'} className={'loader'} />
      </Styles.Loader>
    </Styles.Root>
  );
};

interface ITimeTableProps {
  data: ITimeTable[];
}

const TimeTable: React.FC<ITimeTableProps> = ({ data }) => {
  const columns = [
    {
      title: 'Lesson',
      dataIndex: 'lesson',
      key: 'lesson',
    },
    {
      title: 'ClassRoom',
      dataIndex: 'classRoom',
      key: 'classRoom',
    },
    {
      title: 'Discipline',
      dataIndex: 'discipline',
      key: 'discipline',
    },
    {
      title: 'Teacher',
      key: 'teacher',
      dataIndex: 'teacher',
    },
  ];

  const dataSource = useMemo(() => getProcessedTimeTableData(data), [data]);

  return (
    <Styles.ContentContainer>
      {dataSource.map(({ dayOfWeek, lessons }, index) => (
        <Styles.DayContainer key={dayOfWeek.toString() + index.toString()}>
          {!!lessons.length ? (
            <Table
              title={() => <Styles.Title>{dayOfWeek}</Styles.Title>}
              columns={columns}
              dataSource={lessons}
              pagination={false}
              bordered
            />
          ) : (
            <Styles.EmptyDay>
              <Styles.Title>{dayOfWeek}</Styles.Title>
              <p>Free Day</p>
            </Styles.EmptyDay>
          )}
        </Styles.DayContainer>
      ))}
    </Styles.ContentContainer>
  );
};

type TProcessedTimeTable = {
  lesson: string;
  classRoom: string;
  discipline: string;
  teacher: string;
};

interface IGetProcessedTimeTableDataResponse {
  dayOfWeek: string;
  lessons: TProcessedTimeTable[];
}

const getProcessedTimeTableData = (
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
    lesson: `${lesson.startTime + '-' + lesson.endTime}`,
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
