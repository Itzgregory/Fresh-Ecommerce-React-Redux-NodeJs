import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { ItemList, PageNotFound } from '../../../'
import './ItemListContainer.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../../../../features"

export function ItemListContainer({ greetings }) {
  const { id } = useParams()
  const [invalidCategory, setInvalidCategory] = useState(false)

  const productState = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(id))
      .unwrap()
      .catch(error => {
        if (error && (error.includes("not found") || error.includes("Invalid"))) {
          setInvalidCategory(true)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (invalidCategory) {
    return <PageNotFound />
  }

  return (
    <>
      <h1 className="greetings">{greetings}</h1>
      {productState.loading ? 
        <h1>Loading...</h1> 
        : 
        productState.error ? 
          <div className="error-message">{productState.error}</div> 
          : 
          <ItemList products={Array.isArray(productState.products) ? productState.products : []} />
      }
    </>
  )
}