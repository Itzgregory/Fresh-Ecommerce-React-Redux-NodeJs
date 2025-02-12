import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { LogIn } from '../../../index';
import { 
  getProductsCart, 
  authenticateUser, 
  getAllOrders 
} from '../../../../features';
import { alertFromServerResponse } from '../../../../Utils/index';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';

export const LoginContainer = React.memo(() => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user, shallowEqual);
  const isLoading = userState.loading;
  const navigate = useNavigate();

  const stableAlert = useCallback((response) => {
    alertFromServerResponse(response);
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role');
    
    if (authToken && userState?.User) {
      navigate(userRole === 'admin' ? '/admin' : '/');
    }
  }, [userState?.User, navigate]);

  const handleLogin = async (data) => {
    try {
      const response = await dispatch(authenticateUser(data)).unwrap();
      
      if (response?.success) {
        await Promise.all([
          dispatch(getProductsCart()).unwrap(),
          dispatch(getAllOrders()).unwrap()
        ]);
        
        navigate(response.user?.role === 'admin' ? '/admin' : '/');
      }
      
      stableAlert(response);
    } catch (error) {
      handleError(error, "bottom-left");
    }
  };

  const navigateToRegister = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <LogIn 
          onSubmit={handleLogin}
          Register={navigateToRegister}
          User={userState.User}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});
