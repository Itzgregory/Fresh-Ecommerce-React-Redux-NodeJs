import { AdminPanel } from '../../../'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { alertFromServerResponse } from '../../../../Utils/index';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';
import { deleteProduct, listProducts } from '../../../../api';

export function AdminContainer() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listProducts()
      .then((resp) => setList(resp.map(product => (product))))
      .catch((error) => handleError(error)); 
  }, []);

  const addProduct = () => {
    navigate('/admin/add');
  };

  const checkOrders = () => {
    navigate('/admin/orders');
  };

  const DeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id); 
      alertFromServerResponse(response); 

      if (response.success) {
        setList(list.filter(product => product._id !== id));
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {!list.length ? <h4>Searching Products...</h4>
        :
        <AdminPanel 
          deleteProduct={DeleteProduct} 
          addProduct={addProduct} 
          products={list} 
          checkOrders={checkOrders} 
        />
      }
    </>
  );
}
