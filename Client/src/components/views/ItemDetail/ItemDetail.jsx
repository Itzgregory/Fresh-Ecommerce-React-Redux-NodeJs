import { Card, Row, Col, Container } from 'react-bootstrap';
import { BtnAction, ItemCount } from '../';
import './ItemDetail.css'
import { Magnifier } from '../../../Utils';
import MediaQuery from 'react-responsive'


export const ItemDetail = function ({ changePhoto, photo, product, onAdd, Add }) {
    return (
        <>
            {product.map(product =>
                <MediaQuery minWidth={700}>
                    <Container fluid id='productContent' className='contenedor'>
                        <Container className='fotosAux'>
                            <Col><img src={product.photo} onMouseMove={changePhoto} alt='foto1' /></Col>
                            <Col>{product.photo2 ? <img src={product.photo2} onMouseMove={changePhoto} alt='foto2' /> : <></>}</Col>
                            <Col>{product.photo3 ? <img src={product.photo3} onMouseMove={changePhoto} alt='foto3' /> : <></>}</Col>
                        </Container>
                        <Container fluid id='containerUpper' >
                            <Container id='detailled'>
                                <Container id='fotoContainer'>
                                    <Magnifier src={photo === undefined ? product.photo : photo} />
                                </Container>
                                <Row id='cardBtns' xs="auto" md="auto" className="g-3">
                                    <Col>
                                        <Card id='cardDetail' border='light'>
                                            <Card.Body>
                                                <Card.Title id='productName'>{product.name}</Card.Title>
                                                <Card.Text id='productPrice'>
                                                    {`Price: ¥ ${product.price}`}
                                                </Card.Text>
                                                {Add ? <BtnAction /> :
                                                    <ItemCount onAdd={onAdd} initial={1} stock={product.stock} product={product} />}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                            <div className='container' id='itemDescription'>
                                {product.description.replaceAll("~", "\n")}
                            </div>
                        </Container>
                    </Container>
                </MediaQuery>)}
            {product.map(product =>
                <MediaQuery minWidth={200} maxWidth={700}>
                    <Container id='productContent' className='contenedor'>
                        <Container fluid id='productContainer'>
                            <Container fluid id='photoContainer'>
                                <Magnifier src={photo === undefined ? product.photo : photo} />
                                <Container id='photosAux'>
                                    <img src={product.photo} onMouseMove={changePhoto} alt='foto1' />
                                    {product.photo2 ? <img src={product.photo2} onMouseMove={changePhoto} alt='foto2' /> : <></>}
                                    {product.photo3 ? <img src={product.photo3} onMouseMove={changePhoto} alt='foto3' /> : <></>}
                                </Container>
                            </Container>
                            <Container id='detailled'>
                                <Container id='cardDetail'>
                                    <p>{product.name}</p>
                                    <p id='productPrice'>{`Price: ¥ ${product.price}`}</p>
                                </Container>
                                {Add ? <BtnAction /> :
                                    <ItemCount onAdd={onAdd} initial={1} stock={product.stock} product={product} />}
                            </Container>
                        </Container>
                        <Container fluid id='itemDescription' >
                            {product.description.replaceAll("~", "\n")}
                        </Container>
                    </Container>
                </MediaQuery>)}
        </>
    )
}


