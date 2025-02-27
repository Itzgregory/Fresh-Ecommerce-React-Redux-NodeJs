import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../../api';
import { alertFromServerResponse } from '../../../../Utils/index';
import { AddProductPanel } from '../../..';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';

export function AddProductContainer() {
  const navigate = useNavigate();

  const regresar = () => {
    navigate('/admin');
  };

  const saveProduct = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('code', data.code);
    formData.append('category', data.category);

    data.photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    formData.append('price', data.price);
    formData.append('stock', data.stock);

    try {
      await addProduct(formData);
      navigate('/admin');
      alertFromServerResponse({
        statusCode: 200,
        success: true,
        message: 'Product added successfully!',
        data: null,
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <AddProductPanel back={regresar} save={saveProduct} />
    </div>
  );
}
