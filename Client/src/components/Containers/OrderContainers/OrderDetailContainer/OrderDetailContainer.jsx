import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { OrderUserList } from '../../../'
import { listOrdersById } from '../../../../api'


export const OrderDetailContainer = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState([])

  useEffect(() => {
    listOrdersById(id)
    .then(resp => setOrder(resp.reduce(( properties, property ) => ({
      ...properties,
      property
    } ))))
    }, [id])
  
    const backToOrder = () => {
      navigate('/orders')
    }
   
    return (
        <div>
        {Array.isArray(order)? <h1>...Loading Order</h1> :<OrderUserList  items={order.items} order={order} back={backToOrder}/>}
      </div>    )
}

