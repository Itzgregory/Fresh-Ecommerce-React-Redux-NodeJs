import { AdminPanel, PageNotFound } from '../../../'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { alertFromServerResponse } from '../../../../Utils/index'
import handleError from '../../../../Utils/HandleErrors/ErrorHandler'
import { deleteProduct, listProducts } from '../../../../api'

export function AdminContainer() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [invalidRoute, setInvalidRoute] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    listProducts()
      .then((resp) => {
        if (resp && resp.data && Array.isArray(resp.data)) {
          setList(resp.data)
        } else if (resp && Array.isArray(resp)) {
          setList(resp)
        } else {
          setList([])
          setError('Unexpected response format from server')
          console.warn('Expected array response from listProducts, got:', resp)
        }
      })
      .catch((error) => {
        handleError(error)
        setError('Failed to load products')
        setList([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const path = location.pathname
    const validPaths = ['/admin', '/admin/add', '/admin/orders']
    const isIdPath = /^\/admin\/\d+$/.test(path)
    
    if (!validPaths.includes(path) && !isIdPath) {
      setInvalidRoute(true)
    }
  }, [location.pathname])

  const addProduct = () => {
    navigate('/admin/add')
  }

  const checkOrders = () => {
    navigate('/admin/orders')
  }

  const DeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id)
      alertFromServerResponse(response)

      if (response.success) {
        setList(list.filter(product => product._id !== id))
      }
    } catch (error) {
      handleError(error)
    }
  }

  if (invalidRoute) {
    return <PageNotFound />
  }

  return (
    <>
      {loading ? 
        <h4>Searching Products...</h4>
        : error ? 
          <div className="error-message">{error}</div>
          : !list.length ?
            <div>No products found</div>
            :
            <AdminPanel 
              deleteProduct={DeleteProduct} 
              addProduct={addProduct} 
              products={list} 
              checkOrders={checkOrders} 
            />
      }
    </>
  )
}