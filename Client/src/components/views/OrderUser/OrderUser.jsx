import './OrderUser.css'
export const OrderUserList = ({ items, order, back }) => {
    return (
        <>
            <div className="orderUserResume">
                <p>Order Id: {order._id}</p>
                <p>Order Placed: {order.date}</p>
                <p>Buyer: {order.buyer}</p>
                <p>Total Units: {items.reduce((accQty, { Qty }) => accQty + Qty, 0)}</p>
                <p>Total Cost:¥{items.reduce((acc, { price }) => acc + price, 0)}</p>
            </div>
            {items.map((item) => (
                <div key={item.idProduct} className="orderUser">
                    <div className='orderUserBox'>
                        <p>Id: {item.idProduct}</p>
                        <p>Code: {item.code}</p>
                        <p>Name: {item.name}</p>
                        <p>Category: {item.category}</p>
                        <p>Cost: ¥{item.price}</p>
                    </div>
                    <div className='orderUserBody'>
                        <div className='orderUserImage'>
                            <img className="fotoCart" src={item.photo} alt={"logo"} />
                        </div>
                        <div className='orderUserDescription' >
                            <p>Descripcion:</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
            <button className='btn btn-success' id='back-orders' onClick={back}>Back to orders</button>
        </>
    )
}

