import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './btnAction.css'
import { useState } from "react";
import { useSelector } from "react-redux";


export function BtnAction() {
  return (
    <div className='btnContainer'>
      <Link to='/cart'>
        <Button className='btnBuy' variant='primary'>Go Cart</Button>
      </Link>
      <Link to='/'>
        <Button className='btnBuy' variant='primary'>Keep Buying</Button>
      </Link>
    </div>
  )
}

export function ModifyBoton({ product, setCartList, updateQty, cartList }) {
  const productList = useSelector(state => state.product.products)
  const stock = productList.find(prod => prod._id === product.idProduct).stock
  const [Modify, setModify] = useState(false)
  const [count, setCount] = useState(product.Qty)
  const [stockProduct, setStockProduct] = useState(stock)


  function addItem(id) {
    if (count <= stock) {
      setCount(count + 1)
      setStockProduct(stockProduct - 1)
      setCartList(cartList.map(item => item.idProduct === product.idProduct ? {...item, Qty:item.Qty +1}:item))
    }
  }
  function remove(id) {
    if (count > 1) {
      setCount(count - 1)
      setStockProduct(stockProduct + 1)
      setCartList(cartList.map(item => item.idProduct === product.idProduct ? {...item, Qty:item.Qty - 1}:item))
    }
  }

  const ModifyBtn = (id) => {
    if (Modify === false) {
      setModify(true)
    } else {
       updateQty(id)
       setModify(false)
    }
  }
  return (
    <div className='btnModify'>
      {Modify ?
        <div>
          <Container>
            <Container>
              <span>Stock:{stockProduct}</span>
            </Container>
            <div id="box">
              <div id="countMinus">
                <svg onClick={() => remove(product.idProduct)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>

              </div>
              <input id="Qty" type="text" value={count} readOnly></input>
              <div id="countPlus" >
                <svg onClick={() => addItem(product.idProduct)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </div>
            </div>

          </Container>
          <Button id='btnModifyQty' onClick={() => ModifyBtn(product.idProduct)} variant='success'>Modify!</Button>
        </div>
        :
        <Button id='btnModifyQty' onClick={ModifyBtn} >Modify</Button>}
    </div>
  )
}


