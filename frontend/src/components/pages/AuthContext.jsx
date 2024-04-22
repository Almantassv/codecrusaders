import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { apiClient } from './apis';

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState("");



    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        if (token) {
          const user = jwtDecode(token);
          console.log('User from jwtDecode:', user);
          setToken(token);
          setUser(user);
        }
        setIsLoading(false);
      }, []);

    const loginUser = async (token) => {
      console.log("Data: ", token);
        try {
          // const response = await apiClient.post('/api/login', {
          //   username: data.username,
          //   password: data.password,
          // });
          if (token) {
           
            // const token = response.data.token;
            console.log(token);
            const user = jwtDecode(token);
            console.log('User from loginUser:', user);
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return { token, user };
          } else {
            throw new Error('Response data is undefined');
          }
        } catch (error) {
          console.error('Failed to log in:', error);
          throw error;
        }
      };

      const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      };

    return (
        <AuthContext.Provider value={{ isLoading, token, user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};