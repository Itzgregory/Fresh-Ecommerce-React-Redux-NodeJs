import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from '../../../index';
import { getProductsCart, authenticateUser, getAllOrders } from '../../../../features';
import { alertFromServerResponse, setAuthToken, clearAuthData } from '../../../../Utils/index';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';

export const LoginContainer = React.memo(() => {
    const dispatch = useDispatch();
    const { loading: isLoading, users, User } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleLogin = useCallback(async (data) => {
        try {
            const response = await dispatch(authenticateUser(data)).unwrap();
            
            if (response?.success && response?.data?.token) {
                const { id, token, role, expiresIn } = response.data;
                
                if (Object.keys(users).length > 0) {
                    const confirmSwitch = window.confirm(
                        "Another user is already logged in. Would you like to:" +
                        "\n- OK: Switch to this account" +
                        "\n- Cancel: Keep both sessions"
                    );
                    
                    if (confirmSwitch) {
                        clearAuthData();
                    }
                }
                
                setAuthToken(id, token, role, expiresIn);
                
                try {
                    await Promise.all([
                        dispatch(getProductsCart()),
                        dispatch(getAllOrders())
                    ]);
                } catch (err) {
                    console.warn("Failed to load initial data:", err);
                }

                navigate(role === 'admin' ? '/admin' : '/', { replace: true });
            }
        } catch (error) {
            handleError(error, "bottom-left");
        }
    }, [dispatch, navigate, users]);

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <LogIn 
                    onSubmit={handleLogin}
                    Register={() => navigate('/signup')}
                    User={User}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
});
