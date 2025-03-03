import { Navigate, Route, Routes } from 'react-router'
import { 
    Cart, OrderDetailContainer, OrderListContainer, 
    ItemDetailContainer, ItemListContainer, 
    RegisterContainer, LoginContainer, AdminContainer
} from '../../components'
import { EndBuy, OrderFail, PageNotFound } from '../../components/'
import { useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '../../Utils/auth/authUtils'

export const PublicRoutes = () => {    
    const { User, users, activeUserId } = useSelector(state => state.user)
    const navigate = useNavigate()
    
    const isAuthenticated = useCallback(() => {
        return User && isTokenValid() && users[activeUserId]
    }, [User, users, activeUserId])

    const checkUserAccess = useCallback(() => {
        // Only redirect if on the main page to avoid redirect loops
        if (window.location.pathname === '/' && isAuthenticated() && User?.role === 'admin') {
            navigate('/admin', { replace: true })
        }
    }, [isAuthenticated, User, navigate])

    useEffect(() => {
        checkUserAccess()
    }, [checkUserAccess])

    return (
        <Routes>
            <Route path="/" element={<ItemListContainer greetings="Welcome to our Store" />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<RegisterContainer />} />
            <Route path="/cart" element={isAuthenticated() ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/orders" element={isAuthenticated() ? <OrderListContainer /> : <Navigate to="/login" />} />
            <Route path="/admin" element={
                isAuthenticated() && User?.role === 'admin' 
                ? <AdminContainer /> 
                : <Navigate to="/" replace />
            } />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:id" element={<ItemListContainer greetings="Welcome to our Store" />} />
            <Route path="/endbuy" element={<EndBuy />} />
            <Route path="/failorder" element={<OrderFail />} />
            <Route path="/list/:id" element={isTokenValid() ? <OrderDetailContainer /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}