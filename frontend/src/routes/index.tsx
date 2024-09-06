import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';

const Login = lazy(() => import('./Login'));

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="share"
      element={
        <Suspense fallback={<Spin />}>
          <>Share</>
        </Suspense>
      }
    />
    <Route
      path="login"
      element={
        <Suspense fallback={<Spin />}>
          <Login />
        </Suspense>
      }
    />
    <Route
      path="signup"
      element={
        <Suspense fallback={<Spin />}>
          <>Sign up page</>
        </Suspense>
      }
    />
  </Routes>
);

export default Router;
