import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { listById, updateProduct } from '../../../../api';
import { ModifyProductPanel } from '../../../';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';

export function ModifyProduct() {
    const navigate = useNavigate();
    const [Product, SetProducts] = useState(null);
    const [Buscando, SetBuscando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        listById(id)
            .then(product => {
                if (product?.data) {
                    SetProducts({
                        Id: product.data._id,
                        ...product.data
                    });
                }
            })
            .finally(() => SetBuscando(false));
    }, [id]);

    const regresar = () => {
        navigate('/admin');
    };

    const modifyProduct = async (data) => {
        const formData = new FormData();
        
        if (Product.photos?.length > 0) {
            Product.photos.forEach((photo, index) => {
                if (photo.id) {
                    formData.append(`photoIds[${index}]`, photo.id);
                }
            });
        }

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('code', data.code);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('stock', data.stock);

        if (data.photo?.[0]) {
            formData.append('photos', data.photo[0]);
        }
        if (data.photo2?.[0]) {
            formData.append('photos', data.photo2[0]);
        }
        if (data.photo3?.[0]) {
            formData.append('photos', data.photo3[0]);
        }

        if (!data.photo?.[0] && Product.photos?.[0]) {
            formData.append('existingPhotos', JSON.stringify(Product.photos));
        }

        try {
            await updateProduct(formData, id);
            navigate('/admin');
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div>
            {Buscando ? <h4>Buscando Producto...</h4>
                :
                <ModifyProductPanel modify={modifyProduct} product={Product} back={regresar} />}
        </div>
    );
}