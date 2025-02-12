import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDetail } from '../../../'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsById, addProduct, getProducts } from "../../../../features"


export function ItemDetailContainer() {
  const [Add, setAdd] = useState(false)
  const [Photo, setPhoto] = useState()


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
    dispatch(getProductsById(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  return (
    <>
      <div className="detailProduct">
        {productByIdState.loading ? <h4>Searching Products...</h4>
          :
          <ItemDetail changePhoto={changePhoto} photo={Photo} product={productByIdState.productById} onAdd={onAdd} Add={Add} />}
      </div>
    </>
  )
}

