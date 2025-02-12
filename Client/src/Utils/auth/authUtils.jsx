export const setAuthToken = (token, role, expiresIn = 3600000) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
    localStorage.setItem('tokenExpiry', JSON.stringify(Date.now()+ expiresIn));
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const getUserRole = () => {
    return localStorage.getItem('role');
};

export const isTokenvalid = () => {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry) return false;
    return Date.now() < JSON.parse(expiry);
};

export const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('tokenExpiry');
};