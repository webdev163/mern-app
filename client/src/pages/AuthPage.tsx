import React, {FC} from 'react';

export const AuthPage: FC = () => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
          <h1>Link shortener</h1>
          <div className="card grey lighten-3">
              <div className="card-content">
                  <span className="card-title">Authorization</span>
                  <div className="wrapper">
                      <div className="input-field">
                          <input id="email" type="text" className="validate" name="email"></input>
                          <label htmlFor="email">Email</label>
                      </div>
                      <div className="input-field">
                          <input id="password" type="password" className="validate" name="password"></input>
                          <label htmlFor="password">Password</label>
                      </div>
                  </div>
              </div>
              <div className="card-action">
                <button className="btn blue darken-2">Login</button>
                <button className="btn blue darken-2">Register</button>
              </div>
          </div>
      </div>
    </div>
  )
}