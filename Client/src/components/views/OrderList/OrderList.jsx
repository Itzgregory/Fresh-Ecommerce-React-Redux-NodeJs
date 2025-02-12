import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import './OrderList.css'
import MediaQuery from 'react-responsive'

export function OrderList({ User, orders, options, selector, filter }) {
  return (
    <>
      <MediaQuery minWidth={768}>
        {User.admin === true ? <h1 className='orderListGreeting'>customer purchase order list</h1> : <h1>My orders</h1>}
        <div className='filter-orders' onChange={(e) => filter(e.target.value)}>
          <label>
            <input type="radio" value="All" name="status" />
            All </label>
          <label>
            <input type="radio" value="generated" name="status" />
            Generated</label>
          <label>
            <input type="radio" value="In process" name="status" />
            In Process</label>
          <label>
            <input type="radio" value="Sent it" name="status" />
            Sent It</label>
        </div>
        <table id='tableOrder' className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id Order</th>
              <th scope="col">Buyer</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
              <th scope="col">Total</th>
              <th>Status</th>
              {User.admin === true && <th>Change Status</th>}
              <th scope="col">Check Items</th>
            </tr>
          </thead>
          <tbody>
            {!orders.length ? <span className='no-orders'>You don't have any order</span> : 
            orders.map((order) => (
              <tr key={order._id}>
                <th scope="row">{order._id}</th>
                <td>{order.buyer}</td>
                <td>{order.email}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>Status: {order.status}</td>
                {User.admin === true &&
                  <td>
                    <Select onChange={(status) => selector(status.value, order._id, order.status)} options={options} />
                  </td>}
                <td>
                  <Link to={`/list/${order._id}`}>
                    <Button id='btnCheckOrder' variant='primary'>
                      Check Items
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MediaQuery>
      <MediaQuery minWidth={200} maxWidth={768}>
        {User.admin === true ? <h1 className='orderListGreeting'>customer purchase order list</h1> : <h1>My orders</h1>}
        {orders.map((order) => (
          <div key={order._id} id='orderBox'>
            <div id='orderHead'>
              <p>Id: {order._id}</p>
              <p>Status: {order.status}</p>
            </div>
            <div id='orderBody'>
              <p>Buyer:{order.buyer}</p>
              <p>Email:{order.email}</p>
              <p>Date:{order.date}</p>
              <br />
              <Link to={`/orders/${order._id}`}>
                <Button id='btnCheckOrder' variant='primary'>
                  Check Items
                </Button>
              </Link>
            </div>
            <div id="orderFoot">
              <p>Total:¥{order.total}</p>
              {User.admin === true &&
                <p>Change Status:<Select onChange={(status) => selector(status.value, order._id, order.status)} options={options} /></p>}
            </div>
          </div>
        ))}
      </MediaQuery>
    </>
  )
}
