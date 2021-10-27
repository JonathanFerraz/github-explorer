import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Theme from './styles/theme';

const App: React.FC = () => (
  <>
    <Theme />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
