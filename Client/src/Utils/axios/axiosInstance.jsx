import axios from 'axios';
import { logoutUserStatus } from '../../features';
import configureStore from '../../store/store';
import { isTokenvalid } from '../auth/authUtils';

const URL_BASE = process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL_PROD 
    : process.env.REACT_APP_API_URL_DEV;

const axiosInstance = axios.create({
    baseURL: URL_BASE,
    withCredentials: true,
});

let isRedirecting = false;
const publicRoutes = ['/login', '/signup', '/products/category/', '/products/list'];

axiosInstance.interceptors.request.use(
    (config) => {
        if (publicRoutes.some(route => config.url.startsWith(route))) {
            return config;
        }

        const token = localStorage.getItem('authToken');

        if (token && isTokenvalid()) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('role');
            localStorage.removeItem('tokenExpiry');
            configureStore.dispatch(logoutUserStatus());

            if (!isRedirecting && window.location.pathname !== '/login') {
                isRedirecting = true;
                window.location.href = '/login';
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isUnauthorized = error.response?.status === 401;
        const isAuthRoute = publicRoutes.some(route => error.config.url.startsWith(route));

        if (isUnauthorized && !isAuthRoute) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('role');
            localStorage.removeItem('tokenExpiry');
            configureStore.dispatch(logoutUserStatus());

            if (!isRedirecting && window.location.pathname !== '/login') {
                isRedirecting = true;
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
