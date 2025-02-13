import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { ModifyProduct, AdminContainer, AddProductContainer } from '../../components';
import { getUserRole, isTokenValid} from '../../Utils/auth/authUtils';

export const PrivateRoute = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const userRole = getUserRole();
        const isAuthenticated = isTokenValid();
        
        if (!isAuthenticated || userRole !== 'admin') {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<AdminContainer />} />
            <Route path="/:id" element={<ModifyProduct />} />
            <Route path="/add" element={<AddProductContainer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

