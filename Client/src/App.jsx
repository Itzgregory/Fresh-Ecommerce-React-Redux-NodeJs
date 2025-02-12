import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { PrivateRoute, PublicRoutes } from './routes';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

function App() {
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
