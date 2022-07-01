import React, { FC } from 'react';
import 'materialize-css';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';

const App: FC = () => {
  return (
      <BrowserRouter>
        <div className="container">
          <AppRouter isRegistered={false} />
        </div>
      </BrowserRouter>
  );
}

export default App;
