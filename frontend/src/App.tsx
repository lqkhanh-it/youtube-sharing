import React from 'react';
import Router from './routes';
import './styles/vendors.scss';
import WebSocketComponent from './components/Websocket';

const App = () => (
  <main>
    <WebSocketComponent />
    <Router />
  </main>
);

export default App;
