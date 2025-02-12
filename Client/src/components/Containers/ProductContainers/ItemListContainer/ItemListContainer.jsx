import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { ItemList } from '../../../'
import './ItemListContainer.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../../../../features"

export function ItemListContainer({ greetings }) {
  const { id } = useParams()

  const productState = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(id))  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <h1 className="greetings">{greetings}</h1>
      {productState.loading ? <h1>Loading...</h1> : <ItemList products={Array.isArray(productState.products) ? productState.products : []} />
    }
    </>
  )
}


