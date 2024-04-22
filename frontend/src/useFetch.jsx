import { useState, useEffect } from 'react';
import axios from 'axios';
import { authenticate } from './utils/auth/auth';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        authenticate(); // Authenticate the user before making the API request
        const response = await axios.get(url);
        setData(response.data);
        setIsPending(false);
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, isPending };
};

export default useFetch;