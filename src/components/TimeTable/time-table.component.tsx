import React, { useCallback, useMemo, useState } from 'react';
import { Button, Col, Drawer, Form, FormInstance, Row, Select, Spin, Table } from 'antd';
import {
  getProcessedTimeTableData,
  IGetProcessedTimeTableDataResponse,
} from '../../helpers/getProcessedTimeTableData';
import { IClassRoom, IDiscipline, ITeacher, ITimeTable } from '../../types/models';
import * as Styles from './time-table.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Api from '../../services';
import { Loader } from '../../styles/Loader';

interface ITimeTableProps {
  data: ITimeTable[];
  edit?: boolean;
  groupId?: number;
  update?: () => Promise<void>;
}

export const TimeTable: React.FC<ITimeTableProps> = ({ data, edit, groupId, update }) => {
  const [selectedDay, setSelectedDay] = useState<IGetProcessedTimeTableDataResponse | null>(null);
  const columns = [
    {
      title: 'Lesson',
      dataIndex: ['lesson', 'title'] as string[],
      // eslint-disable-next-line
      key: ['lesson', 'title'] as any,
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

  const existedLessons = useMemo(() => {
    const result: number[] = [];
    if (selectedDay) {
      Object.values(selectedDay.lessons).forEach((item) => {
        result.push(item.lesson.number);
      });
    }
    return result;
  }, [selectedDay]);

  const [form] = Form.useForm();
  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onClose = useCallback(() => {
    onReset();
    setSelectedDay(null);
  }, [onReset]);

  return (
    <Styles.ContentContainer>
      {dataSource.map(({ dayOfWeek, lessons }, index) => (
        <Styles.DayContainer
          key={dayOfWeek.toString() + index.toString()}
          onClick={() => edit && setSelectedDay(dataSource[index])}
        >
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
      {edit && (
        <Drawer
          title={selectedDay?.dayOfWeek}
          width={600}
          onClose={onClose}
          visible={Boolean(selectedDay)}
        >
          <DrawerForm
            dayOfWeekTitle={selectedDay?.dayOfWeek || ''}
            groupId={groupId as number}
            existedLessons={existedLessons}
            close={onClose}
            form={form}
            update={update}
          />
        </Drawer>
      )}
    </Styles.ContentContainer>
  );
};

const { Option } = Select;

interface IDrawerFormProps {
  dayOfWeekTitle: string;
  groupId: number;
  existedLessons: number[];
  close: () => void;
  update?: () => Promise<void>;
  // eslint-disable-next-line
  form: FormInstance<any>;
}

type TOnSubmitProps = {
  lessonId: number;
  disciplineId: number;
  teacherId: number;
  classRoomId: number;
};

const DrawerForm: React.FC<IDrawerFormProps> = ({
  dayOfWeekTitle,
  groupId,
  existedLessons,
  close,
  form,
  update,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { disciplines, teachers, classRooms, lessons, daysOfWeek } = useSelector(
    (state: RootState) => state.generalData
  );

  const dayOfWeekId = daysOfWeek.find((day) => day.name === dayOfWeekTitle)?.id as number;

  const filteredLessons = useMemo(
    () => lessons.filter((lesson) => existedLessons.every((l) => l !== lesson.number)),
    [lessons, existedLessons]
  );

  const onSubmit = async (values: TOnSubmitProps) => {
    try {
      setLoading(true);
      await Api.timeTable.createTimeTable({ ...values, groupId, dayOfWeekId });
      await update?.();
      close();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" hideRequiredMark onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="lessonId"
            label="Lesson"
            rules={[{ required: true, message: 'Please select number of lesson' }]}
          >
            <Select placeholder="Please select number of lesson">
              {filteredLessons.map((lesson) => (
                <Option value={lesson.id} key={lesson.id}>
                  №{lesson.number} ({lesson.startTime}-{lesson.endTime})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="disciplineId"
            label="Discipline"
            rules={[{ required: true, message: 'Please choose the discipline' }]}
          >
            <Select placeholder="Please choose the discipline">
              {disciplines.map((item: IDiscipline) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="teacherId"
            label="Teacher"
            rules={[{ required: true, message: 'Please choose the teacher' }]}
          >
            <Select placeholder="Please choose the teacher">
              {teachers.map((teacher: ITeacher) => (
                <Option
                  value={teacher.id}
                  key={teacher.id}
                >{`${teacher.name} ${teacher.surname}`}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="classRoomId"
            label="Class Room"
            rules={[{ required: true, message: 'Please choose the class room' }]}
          >
            <Select placeholder="Please choose the class room">
              {classRooms.map((item: IClassRoom) => (
                <Option value={item.id} key={item.id}>
                  {item.code}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
      <Loader>
        <Spin spinning={loading} size="large" tip={'Loading...'} />
      </Loader>
    </Form>
  );
};
