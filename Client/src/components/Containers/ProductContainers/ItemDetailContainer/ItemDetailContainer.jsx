import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail, PageNotFound } from '../../../'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsById, addProduct, getProducts } from "../../../../features"


export function ItemDetailContainer() {
  const [Add, setAdd] = useState(false)
  const [Photo, setPhoto] = useState()
  const [invalidId, setInvalidId] = useState(false)

  const { id } = useParams()

  const productByIdState = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const onAdd = async (count, product) => {
    dispatch(addProduct({ count, product }))
      .then(() => setAdd(true))
    dispatch(() => getProducts())
  }

  const changePhoto = (e) => {
    setPhoto(e.target.getAttribute('src'))
  }
  
  useEffect(() => {
    if (id && /^\d+$/.test(id)) {
      dispatch(getProductsById(id))
    } else {
      setInvalidId(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (productByIdState.error && productByIdState.error.includes("not found")) {
      setInvalidId(true)
    }
  }, [productByIdState.error])

  if (invalidId) {
    return <PageNotFound />
  }

  return (
    <>
      <div className="detailProduct">
        {productByIdState.loading ? <h4>Searching Products...</h4>
          :
          productByIdState.productById ? 
            <ItemDetail changePhoto={changePhoto} photo={Photo} product={productByIdState.productById} onAdd={onAdd} Add={Add} /> 
            : 
            productByIdState.error ? <div className="error-message">{productByIdState.error}</div> : null
        }
      </div>
    </>
  )
}