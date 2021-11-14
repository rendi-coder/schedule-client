import { Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TimeTable } from '../../components/TimeTable';
import Api from '../../services';
import { ITimeTable } from '../../types/models';
import * as Styles from './edit-group-schedule.styles';

export const EditGroupSchedule: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [timeTable, setTimeTable] = useState<ITimeTable[]>([]);
  const { groupId } = useParams() as { groupId: string };

  const getTimeTable = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Api.timeTable.getTimeTableByGroup(+groupId);
      setTimeTable(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    getTimeTable();
  }, [getTimeTable]);

  return (
    <Styles.Root>
      {!!timeTable.length && (
        <TimeTable data={timeTable} edit groupId={+groupId} update={getTimeTable} />
      )}
      <Styles.Loader>
        <Spin spinning={loading} size="large" tip={'Loading...'} className={'loader'} />
      </Styles.Loader>
    </Styles.Root>
  );
};
