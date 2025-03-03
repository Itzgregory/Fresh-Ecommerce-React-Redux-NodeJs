import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { switchActiveUser } from './features/user/user';  
import { NavBar } from './components';
import { PrivateRoute, PublicRoutes } from './routes';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
      dispatch(switchActiveUser(activeUser));
    }
  }, [dispatch]);

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/*' element={<PublicRoutes />} />
          <Route path='/admin/*' element={<PrivateRoute />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
