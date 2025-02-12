import { Navigate, Route, Routes } from 'react-router';
import { ModifyProduct, AdminContainer, AddProductContainer } from '../../components';
import { useSelector } from 'react-redux' 


export const PrivateRoute = () => {
    const userState = useSelector((state) => state.user.User)
    console.log(userState.admin)
    return (
        <>
            <Routes>
                <Route path='/' element={userState.admin ? <AdminContainer/> : <Navigate to='/' replace/>}/>
                <Route path='/:id' element={userState.admin  ? <ModifyProduct /> : <Navigate to='/' replace />} />
                <Route path='/add' element={userState.admin ? <AddProductContainer /> : <Navigate to='/' replace />} />
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </>
    );
}

export default PrivateRoute;