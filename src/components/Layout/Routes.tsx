import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AuthLayout } from './AuthLayout';
import { AppLayout } from './AppLayout';
import { RootState } from '../../store';

export const Routes: React.FC = (): JSX.Element => {
  const { auth } = useSelector((state: RootState) => state);

  return <Router>{auth.token || true ? <AppLayout /> : <AuthLayout />}</Router>;
};
