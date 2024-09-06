import React, { FunctionComponent, lazy, Suspense } from 'react';
import Spin from 'antd/es/spin';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';

const Login = lazy(() => import('./Login'));
const SignUp = lazy(() => import('./Signup'));

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/login"
      element={
        <Suspense fallback={<Spin />}>
          <Login />
        </Suspense>
      }
    />
    <Route
      path="/signup"
      element={
        <Suspense fallback={<Spin />}>
          <SignUp />
        </Suspense>
      }
    />
  </Routes>
);

export default Router;
