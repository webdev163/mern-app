import {useCallback, useEffect, useState} from "react";
import {LS_USER_DATA} from '../utils/constants';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(LS_USER_DATA, JSON.stringify({userId: jwtToken, token: id}));
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(LS_USER_DATA);
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LS_USER_DATA) || '{}')

    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  return { login, logout, token, userId }
}