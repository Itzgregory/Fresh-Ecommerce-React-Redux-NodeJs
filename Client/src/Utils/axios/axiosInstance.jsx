import axios from 'axios';
import { isTokenValid, clearAuthData, getAuthToken } from '../auth/authUtils';

const URL_BASE = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;

const publicRoutes = ['/login', '/signup', '/products/category/', '/products/list'];

const axiosInstance = axios.create({
    baseURL: URL_BASE,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    }
});

const getCSRFToken = () => document.querySelector('meta[name="csrf-token"]')?.content;

// Function to handle logout logic
const handleLogout = () => {
    clearAuthData();
    
    // Handle logout without direct store dependency
    // We'll navigate to login page immediately
    if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
    
    // Then attempt to dispatch the action
    setTimeout(() => {
        // Use dynamic import to get the store and logout action
        Promise.all([
            import('../../store/store'),
            import('../../features/user/user')
        ]).then(([storeModule, userModule]) => {
            const store = storeModule.default;
            store.dispatch(userModule.logoutUserStatus());
        }).catch(err => {
            console.error("Failed to dispatch logout action:", err);
        });
    }, 0);
};

axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = getCSRFToken();
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }

        if (publicRoutes.some(route => config.url.startsWith(route))) {
            return config;
        }
        
        const token = getAuthToken();
        const isLoginPage = window.location.pathname === '/login';

        if (isLoginPage) {
            return config;
        }

        if (token && isTokenValid()) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            handleLogout();
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isUnauthorized = error.response?.status === 401;
        const isForbidden = error.response?.status === 403;
        const isAuthRoute = publicRoutes.some(route => error.config.url.startsWith(route));

        if ((isUnauthorized || isForbidden) && !isAuthRoute) {
            handleLogout();
        }

        if (error.response?.status === 419) { 
            window.location.reload(); 
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;