import React, { FC, useContext, useEffect, useState } from 'react';
import {useHttp} from '../hooks/useHttp';
import {useToast} from "../hooks/useToast";
import { AuthContext } from '../context/AuthContext';

export const AuthPage: FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const {loading, error, request, clearError} = useHttp();
  const message = useToast();
  const auth = useContext(AuthContext);

  useEffect(() => {
    error && message(error);
    clearError();
  }, [error, message, clearError])

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setForm({...form, [target.name]: target.value});
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link shortener</h1>
        <div className="card grey lighten-3">
          <div className="card-content">
            <span className="card-title">Authorization</span>
            <div className="wrapper">
              <div className="input-field">
                <input id="email" type="text" className="validate" name="email" onChange={changeHandler}></input>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input id="password" type="password" className="validate" name="password"
                       onChange={changeHandler}></input>
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn blue darken-2" onClick={loginHandler} disabled={loading}>Login</button>
            <button className="btn blue darken-2" onClick={registerHandler} disabled={loading}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}