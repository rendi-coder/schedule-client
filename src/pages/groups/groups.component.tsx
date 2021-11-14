import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import Api from '../../services';
import { IGroup } from '../../types/models';
import { AlignType } from 'rc-table/lib/interface';
import { useHistory } from 'react-router';

export const GroupsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const history = useHistory();

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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Group',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as AlignType,
    },
  ];

  return (
    <Table
      dataSource={groups}
      columns={columns}
      pagination={false}
      loading={loading}
      style={{ maxWidth: 600 }}
      onRow={(record) => {
        return {
          onClick: () => {
            history.push(`/schedule/${record.id}`);
          },
        };
      }}
    />
  );
};
