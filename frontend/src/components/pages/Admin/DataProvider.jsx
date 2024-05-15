import axios from "axios";

export const DataProvider = async (token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};