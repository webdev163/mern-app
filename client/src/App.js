import React from 'react';
import 'materialize-css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './router/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <AppRouter isRegistered={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;
