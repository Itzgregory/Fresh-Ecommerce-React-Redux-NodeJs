import { setAuthToken } from '../../Utils/auth/authUtils';
import axiosInstance from '../../Utils/axios/axiosInstance';
import handleError from '../../Utils/HandleErrors/ErrorHandler';

export const userLogin = async (data, navigate) => {
  const url = `/login`;
  try {
    const query = await axiosInstance.post(url, data);
    if (query.data?.token) {
      setAuthToken(query.data.token, query.data.user?.role);

      if (query.data.user?.role === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/'); 
      }
    }
    return query.data;
  } catch (error) {
    if (!error.response || error.response.status !== 401) {
      handleError(error);
    }
    throw error;
  }
};


export const registerUser = async (data) => {
  try {
    const query = await axiosInstance.post('/signup', data);
    return query.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const logOutUser = async () => {
  try {
    const query = await axiosInstance.post('/logout');
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('tokenExpiry');
    return query.data;
  } catch (error) {
    handleError(error, 'bottom-right');
    throw error;
  }
};

export const getLogedUser = async () => {
  try {
    const query = await axiosInstance.get('/user');
    return query.data;
  } catch (error) {
    handleError(error, 'bottom-right');
    throw error;
  }
};
