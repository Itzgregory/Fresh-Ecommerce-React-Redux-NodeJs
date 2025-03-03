import { Card, Row, Col, Container } from 'react-bootstrap';
import { BtnAction, ItemCount } from '../';
import './ItemDetail.css';
import { Magnifier } from '../../../Utils';
import MediaQuery from 'react-responsive';

export const ItemDetail = ({ changePhoto, photoIndex, product, onAdd, Add }) => {
  return (
    <>
      {product.map(product => (
        <MediaQuery minWidth={700} key={product._id}>
          <Container fluid id="productContent" className="contenedor">
            <Container className="fotosAux">
              {product.photos?.map((photo, index) => (
                <Col key={index}>
                  <img
                    src={photo.url}
                    onMouseMove={() => changePhoto(index)}
                    alt={`Product Photo ${index + 1}`}
                  />
                </Col>
              ))}
            </Container>
            <Container fluid id="containerUpper">
              <Container id="detailled">
                <Container id="fotoContainer">
                  <Magnifier src={product.photos?.[photoIndex || 0]?.url || "https://via.placeholder.com/150"} />
                </Container>
                <Row id="cardBtns" xs="auto" md="auto" className="g-3">
                  <Col>
                    <Card id="cardDetail" border="light">
                      <Card.Body>
                        <Card.Title id="productName">{product.name}</Card.Title>
                        <Card.Text id="productPrice">
                          {`Price: ¥ ${product.price}`}
                        </Card.Text>
                        {Add ? <BtnAction /> : (
                          <ItemCount onAdd={onAdd} initial={1} stock={product.stock} product={product} />
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <div className="container" id="itemDescription">
                {product.description.replaceAll("~", "\n")}
              </div>
            </Container>
          </Container>
        </MediaQuery>
      ))}
      {product.map(product => (
        <MediaQuery minWidth={200} maxWidth={700} key={product._id}>
          <Container id="productContent" className="contenedor">
            <Container fluid id="productContainer">
              <Container fluid id="photoContainer">
                <Magnifier src={product.photos?.[photoIndex || 0]?.url || "https://via.placeholder.com/150"} />
                <Container id="photosAux">
                  {product.photos?.map((photo, index) => (
                    <img
                      key={index}
                      src={photo.url}
                      onMouseMove={() => changePhoto(index)}
                      alt={`Product Photo ${index + 1}`}
                    />
                  ))}
                </Container>
              </Container>
              <Container id="detailled">
                <Container id="cardDetail">
                  <p>{product.name}</p>
                  <p id="productPrice">{`Price: ¥ ${product.price}`}</p>
                </Container>
                {Add ? <BtnAction /> : (
                  <ItemCount onAdd={onAdd} initial={1} stock={product.stock} product={product} />
                )}
              </Container>
            </Container>
            <Container fluid id="itemDescription">
              {product.description.replaceAll("~", "\n")}
            </Container>
          </Container>
        </MediaQuery>
      ))}
    </>
  );
};