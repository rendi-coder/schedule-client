import React, { useCallback, useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import Api from '../../services';
import * as Styles from './dashboard.styles';
import { filterOptionHandler } from '../../helpers/filterOptionHandler';
import { IGroup, ITimeTable } from '../../types/models';
import { SelectValue } from 'antd/lib/select';
import { TimeTable } from '../../components/TimeTable';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGroupId } from '../../store/general_data/general_data.actions';
import { RootState } from '../../store';

const { Option } = Select;

export const Dashboard: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [timeTable, setTimeTable] = useState<ITimeTable[]>([]);
  const selectedGroupId = useSelector((state: RootState) => state.generalData.selectedGroupId);

  const dispatch = useDispatch();

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

  const getTimeTable = useCallback(async (groupId: number) => {
    try {
      console.log(groupId);
      setLoading(true);
      const response = await Api.timeTable.getTimeTableByGroup(groupId);
      setTimeTable(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGroupsRequest();
  }, [getGroupsRequest]);

  useEffect(() => {
    if (selectedGroupId) {
      getTimeTable(selectedGroupId);
    }
  }, [selectedGroupId, getTimeTable]);

  const onChangeGroup = useCallback(
    (groupId: SelectValue) => {
      dispatch(setSelectedGroupId(groupId as number));
    },
    [dispatch]
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
        value={selectedGroupId}
      >
        {groups.map(({ id, name }) => (
          <Option value={id} key={name.toString()}>
            {name}
          </Option>
        ))}
      </Select>
      {!!timeTable.length ? (
        <TimeTable data={timeTable} />
      ) : (
        <div style={{ fontSize: 20, marginTop: 20 }}>Please Select Group</div>
      )}
      <Styles.Loader>
        <Spin spinning={loading} size="large" tip={'Loading...'} className={'loader'} />
      </Styles.Loader>
    </Styles.Root>
  );
};
