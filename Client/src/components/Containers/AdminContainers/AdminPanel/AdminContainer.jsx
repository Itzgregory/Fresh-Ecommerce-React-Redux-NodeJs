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
      .then((resp) => {
        if (Array.isArray(resp)) {
          setList(resp);
        } else {
          setList([]);
          console.warn('Expected array response from listProducts, got:', resp);
        }
      })
      .catch((error) => {
        handleError(error);
        setList([]);
      });
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
