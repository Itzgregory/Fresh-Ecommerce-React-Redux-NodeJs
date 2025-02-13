import { Link } from 'react-router-dom';
import { Card, Button, Row } from 'react-bootstrap';
import './ItemList.css'

export const ItemList = ({ products = [] }) => {
    console.log("Products received in ItemList:", products); 

    if (!Array.isArray(products) || products.length === 0) {
        return <p>No products available</p>;
    }

    return (
        <div className="productsCard">
            {products.map(product => (
                <div key={product._id} className="card" id="cardItems">
                    <Row xs={1} md={3} className="g-3" id="cardContainer">                       
                        <Card border="light" id="Card">
                            {product.photos?.length > 0 ? (
                                <Card.Img className="photo" variant="top" src={product.photos[0].url} alt={product.name} />
                            ) : (
                                <Card.Img className="photo" variant="top" src="https://via.placeholder.com/150" alt="Placeholder" />
                            )}

                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text id="productPrice">
                                    {`Price: ₦ ${product.price}`}
                                </Card.Text>
                            </Card.Body>
                            <Link to={`/detail/${product._id}`}>
                                <Button id="btnDetail" variant="primary">
                                    View Product
                                </Button>
                            </Link>
                        </Card>
                    </Row>
                </div>
            ))}
        </div>
    );
};
