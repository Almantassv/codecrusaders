import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

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

          let currentDate = new Date();
          if (user.exp * 1000 < currentDate.getTime()) {
            console.log('Token expired');
            logoutUser();
          }
          else {
            console.log('User from jwtDecode:', user);
            setToken(token);
            setUser(user);
          }
        }
        setIsLoading(false);
      }, []);

      const loginUser = async (token) => {
        try {
          if (token) {
            const user = jwtDecode(token);
            localStorage.setItem('token', token);
            setToken(token);
            setUser(user);
            return { token, user };
          } else {
            throw new Error('Token is missing or empty');
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