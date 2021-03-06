import React, { FC } from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import {useAuth} from './hooks/useAuth';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

const App: FC = () => {
  const {token, login, logout, userId, isReady} = useAuth();
  const isAuth = !!token;

  if (!isReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
      <BrowserRouter>
        {isAuth && <Navbar />}
        <div className="container">
          <AppRouter isRegistered={isAuth} />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
