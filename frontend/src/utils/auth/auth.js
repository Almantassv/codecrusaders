// auth.js
import axios from "axios";

export const login = async (values) => {
  try {
    const response = await axios.post("http://localhost:8080/api/login", values);
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const getLoggedInUser = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) return null;
  return loggedInUser;
};

export const authenticate = () => {
  const loggedInUser = getLoggedInUser();
  const token = loggedInUser ? loggedInUser.accessToken : null;

  // Adding token to axios header
  axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;

  console.log('Logged-in user:', loggedInUser);
  console.log('Access token:', token);
};

export const logout = () => {
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"]; // Remove the Authorization header
};