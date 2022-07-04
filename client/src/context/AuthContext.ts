import {createContext} from 'react';

interface AuthContextInterface {
  token: string | null;
  userId: string | null;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuth: false
})