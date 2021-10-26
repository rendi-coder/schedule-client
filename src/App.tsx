import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import 'antd/dist/antd.css';

import './index.css';
import { Routes } from './components/Layout/Routes';
import store from './store';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <ContentLayout>
        <Routes />
      </ContentLayout>
    </ReduxProvider>
  );
}

export default App;

const ContentLayout = styled(Layout)`
  height: 100vh;
`;
