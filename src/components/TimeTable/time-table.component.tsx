import React, { useCallback, useMemo, useState } from 'react';
import { Button, Drawer, Form, Table } from 'antd';
import {
  getProcessedTimeTableData,
  IGetProcessedTimeTableDataResponse,
  TProcessedTimeTable,
} from '../../helpers/getProcessedTimeTableData';
import { ITimeTable } from '../../types/models';
import * as Styles from './time-table.styles';
import { DrawerForm } from './drawer-add-lesson';
import { DrawerLessonInfo } from './drawer-lesson-info';

interface ITimeTableProps {
  data: ITimeTable[];
  edit?: boolean;
  groupId?: number;
  update?: () => Promise<void>;
}

export const TimeTable: React.FC<ITimeTableProps> = ({ data, edit, groupId, update }) => {
  const [selectedDay, setSelectedDay] = useState<IGetProcessedTimeTableDataResponse | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<TProcessedTimeTable | null>(null);

  const columns = useMemo(() => {
    const result = [
      {
        title: 'Lesson',
        dataIndex: ['lesson', 'title'] as string[],
        // eslint-disable-next-line
        key: ['lesson', 'title'] as any,
      },
      {
        title: 'ClassRoom',
        dataIndex: ['classRoom', 'title'] as string[],
        // eslint-disable-next-line
        key: ['classRoom', 'title'] as any,
      },
      {
        title: 'Discipline',
        dataIndex: ['discipline', 'title'] as string[],
        // eslint-disable-next-line
        key: ['discipline', 'title'] as any,
      },
      {
        title: 'Teacher',
        dataIndex: ['teacher', 'title'] as string[],
        // eslint-disable-next-line
        key: ['teacher', 'title'] as any,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text = 'Lesson info', record: TProcessedTimeTable) => (
          <Styles.ActionBtn onClick={() => openLessonInfoForm(record)}>{text}</Styles.ActionBtn>
        ),
      },
    ];
    return edit ? result : result.slice(0, 4);
  }, [edit]);

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

  const [addNewLessonForm] = Form.useForm();
  const [lessonInfoForm] = Form.useForm();

  const onReset = useCallback(() => {
    addNewLessonForm.resetFields();
    lessonInfoForm.resetFields();
  }, [addNewLessonForm, lessonInfoForm]);

  const onClose = useCallback(() => {
    onReset();
    setSelectedDay(null);
    setSelectedLesson(null);
  }, [onReset]);

  const openAddNewForm = (data: IGetProcessedTimeTableDataResponse) => {
    setSelectedLesson(null);
    setSelectedDay(data);
  };

  const openLessonInfoForm = (data: TProcessedTimeTable) => {
    setSelectedDay(null);
    setSelectedLesson(data);
  };

  const drawerInfo = useMemo(() => {
    const title =
      selectedDay?.dayOfWeek ||
      `Lesson №${selectedLesson?.lesson.number} ${selectedLesson?.lesson.title}`;
    const visible = Boolean(selectedDay || selectedLesson);
    const isOpenLessonInfo = Boolean(selectedLesson);
    return { title, visible, isOpenLessonInfo };
  }, [selectedDay, selectedLesson]);

  return (
    <Styles.ContentContainer>
      {dataSource.map(({ dayOfWeek, lessons }, index) => (
        <Styles.DayContainer key={dayOfWeek.toString() + index.toString()}>
          {!!lessons.length ? (
            <Table
              title={() => (
                <Styles.Title>
                  <span>{dayOfWeek}</span>
                  {edit && (
                    <Button onClick={() => openAddNewForm(dataSource[index])} type="primary">
                      Add Lesson
                    </Button>
                  )}
                </Styles.Title>
              )}
              columns={columns}
              dataSource={lessons}
              pagination={false}
              bordered
            />
          ) : (
            <Styles.EmptyDay onClick={() => edit && openAddNewForm(dataSource[index])}>
              <Styles.Title>{dayOfWeek}</Styles.Title>
              <p>Free Day</p>
            </Styles.EmptyDay>
          )}
        </Styles.DayContainer>
      ))}
      {edit && (
        <Drawer title={drawerInfo.title} width={600} onClose={onClose} visible={drawerInfo.visible}>
          {drawerInfo.isOpenLessonInfo ? (
            <DrawerLessonInfo
              selectedLesson={selectedLesson as TProcessedTimeTable}
              close={onClose}
              form={lessonInfoForm}
              update={update}
            />
          ) : (
            <DrawerForm
              dayOfWeekTitle={selectedDay?.dayOfWeek || ''}
              groupId={groupId as number}
              existedLessons={existedLessons}
              close={onClose}
              form={addNewLessonForm}
              update={update}
            />
          )}
        </Drawer>
      )}
    </Styles.ContentContainer>
  );
};
