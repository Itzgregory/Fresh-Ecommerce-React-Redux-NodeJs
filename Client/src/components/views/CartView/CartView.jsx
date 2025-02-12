import { Link } from "react-router-dom";
import { ModifyBoton, FinishBuy } from "../";
import './CartView.css'

export function CartView({ deleteProduct, user, setCartList, updateQty, generateOrder, cartList }) {
  return (
    <>
      {!cartList.length ?
        <div id="cartMessage" className="card text-center cart-message">
          <div className="card-header">Ops!</div>
          <div className="card-body">
            <h5 className="card-title">¡Your Cart is Empty!</h5>
            <p className="card-text">
              Don't know what to buy? Thousands of products await you!
            </p>
            <Link to="/" className="btn btn-primary">
              Go Shopping!!
            </Link>
          </div>
        </div>
        :
        <>
          <h1 className="greetingCart">Cart of {user}</h1>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th id="tableTh" scope="col">Name</th>
                <th id="tableTh" scope="col">Quantity</th>
                <th id="tableTh" scope="col">Price</th>
                <th id="tableTh" scope="col">Total</th>
                <th id="tableTh" scope="col">Photo</th>
                <th id="tableTh" colSpan={2} scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((product) => (
                <tr key={product.idProduct}>
                  <th id="nameProduct" scope="row">{product.name}</th>
                  <td id="numberTable">{product.Qty}</td>
                  <td id="numberTable">¥{product.price}</td>
                  <td id="numberTable" >¥{product.total}</td>
                  <td><img className="fotoCart" src={product.photo} alt={"logo"} /></td>
                  <td>
                    <div className="actions">
                      <button id="btnDeleteQty"
                        className="btn btn-danger"
                        onClick={() => deleteProduct(product)}
                      >Delete
                      </button>
                       <ModifyBoton product={product} setCartList={setCartList} updateQty={updateQty} cartList={cartList} />
                     </div>
                  </td>
                </tr>
              ))
              }
            </tbody>
             <tfoot>
              <tr>
                <th id="numberTable" scope="col">Totals</th>
                <th id="numberTable" scope="col">{cartList.reduce((accQty, { Qty }) => accQty + Qty, 0)} Units</th>
                <th></th>
                <th id="numberTable" >¥ {cartList.reduce((acc, { total }) => acc + total, 0)}</th>
              </tr>
            </tfoot>
          </table>
           <FinishBuy generateOrder={generateOrder} />
       </>
      }
    </>
  )
}

