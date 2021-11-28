import React, { useState, useMemo } from 'react';
import { Select, FormInstance, Form, Row, Col, Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import Api from '../../services/index';
import { RootState } from '../../store';
import { Loader } from '../../styles/Loader';
import { IDiscipline, ITeacher, IClassRoom } from '../../types/models';

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

export const DrawerForm: React.FC<IDrawerFormProps> = ({
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
