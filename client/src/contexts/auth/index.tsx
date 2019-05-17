import axios from "axios";
import localforage from "localforage";
import React, { useEffect, useState } from "react";

export interface IAuthContext {
  name?: string;
  token?: string;
  login: (name: string, password: string) => Promise<{ result?: string; error?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({
  name: undefined,
  token: undefined,
  login: async () => {
    /* To be defined */
    return { result: undefined, error: undefined };
  },
  logout: async () => {
    /* To be defined */
  },
});

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider = (props: IProps) => {
  const [user, setUser] = useState({ name: undefined, token: undefined });

  useEffect(() => {
    localforage.getItem("user").then((storedUser: any) => {
      if (storedUser) {
        setUser(storedUser);
      }
    });
  }, []);

  const login = async (name: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", {
        name,
        password,
      });
      const loginResponse = { name: data.name, token: data.token };
      setUser(loginResponse);
      localforage.setItem("user", loginResponse);
      return { result: loginResponse.name, error: undefined };
    } catch (error) {
      return { result: undefined, error: error.response.data };
    }
  };

  const logout = async () => {
    await localforage.setItem("user", null);
    setUser({ name: undefined, token: undefined });
  };

  return (
    <AuthContext.Provider value={{ name: user.name, token: user.token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
