import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';

import './index.css';
import { Routes } from './components/Layout/Routes';
import Api from './services';
import {
  setClassRooms,
  setDayOfWeek,
  setDisciplines,
  setGroups,
  setLessons,
  setTeachers,
} from './store/general_data/general_data.actions';

function App(): JSX.Element {
  const dispatch = useDispatch();

  const getInitialState = useCallback(async () => {
    try {
      const disciplines = await Api.discipline.getDisciplines();
      dispatch(setDisciplines(disciplines));

      const teachers = await Api.teachers.getTeachers();
      dispatch(setTeachers(teachers));

      const groups = await Api.group.getGroups();
      dispatch(setGroups(groups));

      const classRooms = await Api.classRoom.getClassRooms();
      dispatch(setClassRooms(classRooms));

      const lessons = await Api.lesson.getLessons();
      dispatch(setLessons(lessons));

      const daysOfWeek = await Api.dayOfWeek.getDaysOfWeek();
      dispatch(setDayOfWeek(daysOfWeek));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialState();
  }, [getInitialState]);

  return (
    <ContentLayout>
      <Routes />
    </ContentLayout>
  );
}

export default App;

const ContentLayout = styled(Layout)`
  height: 100vh;
`;
