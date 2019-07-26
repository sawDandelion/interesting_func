import React, {useState} from 'react';
import request from '../utils/request';

export default () => {

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const onHandle = async (params) => {
    setError(false);
    setLoading(true);

    try {
      return await request({showMessage: true, ...params});
    } catch (error) {
      setError(true);

    } finally {
      setLoading(false);
    }
  };

  return {isLoading, isError, onHandle};
};
