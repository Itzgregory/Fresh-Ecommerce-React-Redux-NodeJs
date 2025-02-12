import { OrderList } from '../../../';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusOrder, filterStatus } from '../../../../features';
import { alertFromServerResponse } from '../../../../Utils/index';
import handleError from '../../../../Utils/HandleErrors/ErrorHandler';  

export const OrderListContainer = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(state => state.order);
  const user = useSelector(state => state.user.User);

  const options = [
    { value: 'generated', label: 'generated' },
    { value: 'In process', label: 'In process' },
    { value: 'Sent it', label: 'Sent it' }
  ];

  const getSelector = async (newStatus, id, currentStatus) => {
    try {
      const response = await dispatch(updateStatusOrder({ status: newStatus, id }));
      
      alertFromServerResponse(response);
    } catch (error) {
      handleError(error); 
    }
  };

  const filter = (filter) => {
    dispatch(filterStatus(filter));
  };

  return (
    <div>
      <OrderList User={user} orderState={orderState} filter={filter} orders={orderState.orders} options={options} selector={getSelector} />
    </div>
  );
};
