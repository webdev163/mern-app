import React, { FC, useContext, useState } from 'react';
import { useHttp } from '../hooks/useHttp';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CreatePage: FC = () => {
  const [link, setLink] = useState<string>('');
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const updateLink = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setLink(target);
  }

  const pressHandler = async (e:  React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
        navigate(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  }

  return (
    <div>
      <h1>Create Page</h1>
      <div className="input-field">
        <input id="link" type="text" value={link} onChange={updateLink} onKeyDown={pressHandler}></input>
        <label htmlFor="link">Type link</label>
      </div>
    </div>
  )
}