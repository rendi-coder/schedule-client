import React, { useState } from 'react';
import {
  FormInstance,
  Form,
  Spin,
  Button,
  Col,
  Row,
  Select,
  message,
  Collapse,
  Divider,
  Input,
  DatePicker,
} from 'antd';
import { TProcessedTimeTable } from '../../helpers/getProcessedTimeTableData';
import { Loader } from '../../styles/Loader';
import { IDiscipline, ITeacher, IClassRoom, IArticle } from '../../types/models';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Api from '../../services';

const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

interface IDrawerFormProps {
  selectedLesson: TProcessedTimeTable;
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

export const DrawerLessonInfo: React.FC<IDrawerFormProps> = ({
  selectedLesson,
  close,
  update,
  form,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { disciplines, teachers, classRooms } = useSelector(
    (state: RootState) => state.generalData
  );

  const onUpdate = async (values: TOnSubmitProps) => {
    const { disciplineId, teacherId, classRoomId } = values;
    const {
      discipline: { id: _disciplineId },
      teacher: { id: _teacherId },
      classRoom: { id: _classRoomId },
    } = selectedLesson;
    if (
      _disciplineId === disciplineId &&
      _teacherId === teacherId &&
      _classRoomId === classRoomId
    ) {
      message.warning('The data is the same, please change the data');
      return;
    }
    try {
      setLoading(true);
      close();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const [articleForm] = Form.useForm();

  const createArticle = async (values: {
    title: string;
    date: moment.Moment;
    description: string;
  }) => {
    try {
      setLoading(true);
      const newArticle = await Api.article.createArticle({
        ...values,
        timeTableId: selectedLesson.id,
        date: values.date.format('DD.MM.YYYY'),
      });
      selectedLesson.articles.push(newArticle);
      articleForm.resetFields();
      await update?.();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" hideRequiredMark onFinish={onUpdate}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="disciplineId"
              label="Discipline"
              rules={[{ required: true, message: 'Please choose the discipline' }]}
              initialValue={selectedLesson.discipline.id}
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
          <Col span={12}>
            <Form.Item
              name="teacherId"
              label="Teacher"
              rules={[{ required: true, message: 'Please choose the teacher' }]}
              initialValue={selectedLesson.teacher.id}
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="classRoomId"
              label="Class Room"
              rules={[{ required: true, message: 'Please choose the class room' }]}
              initialValue={selectedLesson.classRoom.id}
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
              Update
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider type="horizontal" />
      <Form form={articleForm} layout="vertical" hideRequiredMark onFinish={createArticle}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please add title' }]}
            >
              <Input placeholder="Please add title" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please choose the date' }]}
            >
              <DatePicker
                placeholder={'Please choose the date'}
                style={{ width: 200 }}
                format={'DD.MM.YYYY'}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please add description' }]}
            >
              <TextArea placeholder="Please add description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <Button type="primary" htmlType="submit">
              Create Article
            </Button>
          </Col>
        </Row>
      </Form>
      <RenderArticles articles={selectedLesson.articles} />
      <Loader>
        <Spin spinning={loading} size="large" tip={'Loading...'} />
      </Loader>
    </>
  );
};

interface IRenderArticlesProps {
  articles: IArticle[];
}

const RenderArticles: React.FC<IRenderArticlesProps> = ({ articles }) => {
  return articles.length ? (
    <Collapse style={{ marginTop: 30 }}>
      {articles.map((article) => (
        <Panel header={`${article.title} - ${article.date}`} key={article.id}>
          <p>{article.description}</p>
        </Panel>
      ))}
    </Collapse>
  ) : null;
};
