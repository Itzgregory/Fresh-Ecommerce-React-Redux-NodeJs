import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { listById, updateProduct } from '../../../../api';
import { ModifyProductPanel } from '../../../'


export function ModifyProduct() {
    const navigate = useNavigate();
    const [Product, SetProducts] = useState(null)
    const [Buscando, SetBuscando] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        listById(id)
            .then(product => SetProducts({ Id: product._id, ...product }))
            .finally(() => SetBuscando(false))
    }, [id])

    const regresar = () => {
        navigate('/admin')
    }

    const modifyProduct = async (data) => {
        const formData = new FormData();
        formData.append('id', data.photo[0] && Product.photoid)
        formData.append('id', data.photo2[0] && Product.photo2id)
        formData.append('id', data.photo3[0] && Product.photo3id)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('code', data.code)
        formData.append('category', data.category)
        formData.append('photo', data.photo[0] ? data.photo[0] : Product.photo)
        formData.append('photo2', data.photo2[0] ? data.photo2[0] : Product.photo2)
        formData.append('photo3', data.photo3[0] ? data.photo3[0] : Product.photo3)
        formData.append('price', data.price)
        formData.append('stock', data.stock)
        await updateProduct(formData, id)
            .then(() => navigate('/admin'))
    }

    return (
        <div>
            {Buscando ? <h4>Buscando Producto...</h4>
                :
                <ModifyProductPanel modify={modifyProduct} product={Product} back={regresar} />}
        </div>
    )
}

