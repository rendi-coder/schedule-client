import React, { useCallback, useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import Api from '../../services';
import * as Styles from './dashboard.styles';
import { filterOptionHandler } from '../../helpers/filterOptionHandler';
import { IGroup, ITimeTable } from '../../types/models';
import { SelectValue } from 'antd/lib/select';
import { TimeTable } from '../../components/TimeTable';

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
    (groupId: SelectValue) => {
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
