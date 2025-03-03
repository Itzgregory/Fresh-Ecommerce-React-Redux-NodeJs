import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OrderUserList, PageNotFound } from '../../../'
import { listOrdersById } from '../../../../api'

export const OrderDetailContainer = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        // Checking if ID is valid
        if (!id || (typeof id === 'string' && !/^\d+$/.test(id))) {
            setError(true)
            setLoading(false)
            return
        }

        listOrdersById(id)
        .then(resp => {
            if (resp && resp[0]) {
                setOrder(resp[0])
            } else {
                setError(true)
            }
        })
        .catch(() => {
            setError(true)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [id])
  
    const backToOrder = () => {
        navigate('/orders')
    }
   
    if (error) {
        return <PageNotFound />
    }

    return (
        <div>
            {loading ? 
                <h1>...Loading Order</h1> 
                : 
                <OrderUserList items={order.items} order={order} back={backToOrder} />
            }
        </div>
    )
}