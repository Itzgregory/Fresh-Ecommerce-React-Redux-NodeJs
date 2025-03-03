import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ModifyProduct, AdminContainer, AddProductContainer, PageNotFound, OrderListContainer } from '../../components';
import { getUserRole, isTokenValid } from '../../Utils/auth/authUtils';

export const PrivateRoute = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); 

    useEffect(() => {
        const checkAuth = () => {
            const userRole = getUserRole();
            const isAuthenticated = isTokenValid();

            if (isAuthenticated && userRole === 'admin') {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
            setIsCheckingAuth(false);
        };

        checkAuth();
    }, []);

    if (isCheckingAuth) {
        return <p>Loading...</p>;
    }

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<AdminContainer />} />
            <Route path="/orders" element={<OrderListContainer />} />
            <Route path="/:id(\d+)" element={<ModifyProduct />} />
            <Route path="/add" element={<AddProductContainer />} />
            <Route path="*" element={<PageNotFound />} /> 
        </Routes>
    );
};