import React, { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import CommonLayout from '../layouts/CommonLayout';

const Router: FunctionComponent = () => (
  <Routes>
    <Route
      path="/"
      element={
        <CommonLayout>
          <Home />
        </CommonLayout>
      }
    />
  </Routes>
);

export default Router;
