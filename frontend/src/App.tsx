import React from 'react';
import { Link } from 'react-router-dom';
import Router from './routes';
import './styles/vendors.scss';

const App = () => (
  <main>
    <p>App Works!</p>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/share">Share</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
    </ul>
    <Router />
  </main>
);

export default App;
