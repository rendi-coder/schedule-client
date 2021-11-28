import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Drawer, Form, Input, Spin, Table } from 'antd';
import Api from '../../services';
import { ITeacher } from '../../types/models';
import * as Styles from './teachers.styles';
import { useDispatch, useSelector } from 'react-redux';
import { setTeachers } from '../../store/general_data/general_data.actions';
import { RootState } from '../../store';

export const TeachersPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const { teachers } = useSelector((state: RootState) => state.generalData);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => {
    onReset();
    setVisible(false);
  }, [onReset]);

  const requestWrapper = useCallback(async (cb: () => Promise<void>) => {
    try {
      setLoading(true);
      await cb();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeachers = useCallback(async () => {
    const response = await Api.teachers.getTeachers();
    dispatch(setTeachers(response));
  }, [dispatch]);

  useEffect(() => {
    requestWrapper(getTeachers);
  }, [requestWrapper, getTeachers]);

  const createNewTeacher = useCallback(
    (values: ITeacher) => {
      const { name, surname, email } = values;
      requestWrapper(async () => {
        await Api.teachers.createTeacher({ name, surname, email });
        await getTeachers();
        onClose();
      });
    },
    [requestWrapper, onClose, getTeachers]
  );

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
    ],
    []
  );

  return (
    <Styles.Root>
      <Styles.Title>Teachers</Styles.Title>
      {loading ? (
        <Styles.Loader>
          <Spin spinning={loading} tip={'Loading...'} size="large" />
        </Styles.Loader>
      ) : (
        <Styles.ContentContainer>
          <Styles.AddNewBtn type="primary" onClick={onOpen}>
            Add New Teacher
          </Styles.AddNewBtn>
          <Table<ITeacher>
            columns={columns}
            rowKey={'id'}
            dataSource={teachers}
            style={{ maxWidth: 1000 }}
            pagination={teachers.length < 10 ? false : undefined}
            bordered
          />
        </Styles.ContentContainer>
      )}
      <Drawer
        title="Add New Teacher"
        placement="right"
        onClose={onClose}
        visible={visible}
        drawerStyle={{ background: '#fff' }}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{
            name: '',
            surname: '',
            email: '',
          }}
          autoComplete="off"
          onFinish={createNewTeacher}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input teacher name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: 'Please input teacher surname!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Please input valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Styles.Root>
  );
};
