import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const useFetch = (url) => {
  const { token } = useAuth(); // Access token from AuthContext
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    console.log('Token:', token); // Log the token value
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url, token]); // Include token in the dependency array

  return { data, error, isPending };
};

export default useFetch;

