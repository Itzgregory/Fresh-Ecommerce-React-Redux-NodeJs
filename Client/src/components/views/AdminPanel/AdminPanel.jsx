import "./AdminPanel.css";
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown } from 'react-bootstrap';

export const AdminPanel = ({ products, addProduct, deleteProduct, checkOrders }) => {
  console.log(products);
  return (
    <div style={{ backgroundColor: '#01345b', minHeight: '100vh', padding: '20px' }}>
      <Container className="admin-panel-container">
        <div className="table-data">
          {products.length < 1 ? (
            <div style={{ marginTop: -150 }}>
              <div id="cartMessage" className="card text-center cart-message">
                <div className="card-header">Ops!</div>
                <div className="card-body">
                  <h5 className="card-title">There are no products in the list!</h5>
                  <p className="card-text">
                    Do you want agree?
                  </p>
                  <Link to="/admin/add" className="btn btn-primary">
                    Add Products
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="Admintable-data__title">
                <h1>Admin Panel</h1>
                <h5>From this panel you can modify your products, add new products, or check orders!</h5>
                <Container id="actionContainer">
                  <button id="actionBtn" onClick={addProduct} className="btn btn-primary">New Product</button>
                  <button id="actionBtn" onClick={checkOrders} className="btn btn-primary">Check Orders</button>
                </Container>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <th scope="row">{product.name}</th>
                        <td>{product.stock}</td>
                        <td>{product.category}</td>
                        <td>₦{product.price}</td>
                        <td><img className="photoCart" src={product.photos?.[0]?.url} alt={product.name} /></td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="no-caret">
                              ⋮
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item as={Link} to={`/admin/${product._id}`}>Modify Product</Dropdown.Item>
                              <Dropdown.Item onClick={(e) => deleteProduct(product._id, e)}>Delete Product</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
