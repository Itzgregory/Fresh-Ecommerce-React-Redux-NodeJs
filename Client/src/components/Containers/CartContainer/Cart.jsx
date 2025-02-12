import { useEffect } from "react";
import "./Cart.css";
import { useState } from "react";
import { CartView } from '../../'
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, updateProduct, ereaseCart, getAllOrders } from '../../../features'
import { saveOrder } from "../../../api";
import { useNavigate } from "react-router-dom";

export const Cart = () => {  
  const cartState = useSelector(state => state.cart)
  const user = useSelector(state => state.user.User.username)
  
  const [cartList, setCartList] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deleteItem = async (product) => {
    setCartList(cartList.filter(item => item.idProduct !== product.idProduct))
    dispatch(deleteProduct(product))
  }

  const updateQty = (id) => {    
    const originalQty = cartState.products.find(item => item.idProduct === id).Qty
    const product = cartList.find(product => product.idProduct === id)
    
     dispatch(updateProduct({...product,  originalQty: originalQty}))
    }

  useEffect(() => {
    setCartList(cartState.products)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   const generateOrder = async () => {
      await saveOrder(cartList)
        .then(resp => {
          if (resp === true) {   
            dispatch(ereaseCart())
            dispatch(getAllOrders())         
            navigate('/endbuy')
          } else {
            navigate('/failorder')
          }
        })    
    }
  return (
    <>{cartList.loading ? <h1>Loading...</h1> : <CartView deleteProduct={deleteItem} setCartList={setCartList} updateQty={updateQty} generateOrder={generateOrder} cartList={cartList} user={user}></CartView>}</>

  )
};


