import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getCookie } from '../../utils/helpFunctions';

const AxiosInterceptor = ({ children }) => {
  const { push: redirect } = useHistory();
  const [error, setError] = useState(true);
  useEffect(() => {
    axios.get('https://blog.kata.academy/api/user', {
      method: 'Get',
      headers: { Authorization: `Token ${getCookie('token')}` },
    });
  }, []);

  axios.interceptors.response.use(
    (response) => {
      setError(false);
      return response;
    },
    ({ response }) => {
      if (response.status === 401) redirect('/sign-in');
    },
  );

  if (!error) return children;
};

export { AxiosInterceptor };
