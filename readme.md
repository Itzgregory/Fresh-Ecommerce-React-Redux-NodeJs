Ecommerce/
├── Client/
│   ├── config/
│   │   ├── jest/
│   │   │   ├── babelTransform.js
│   │   │   ├── cssTransform.js
│   │   │   └── fileTransform.js
│   │   ├── webpack/
│   │   │   └── persistentCache/
│   │   │       └── createEnvironmentHash.js
│   │   ├── env.js
│   │   ├── getHttpsConfig.js
│   │   ├── modules.js
│   │   ├── paths.js
│   │   ├── webpack.config.js
│   │   └── webpackDevServer.config.js
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── Cart/
│   │   │   │   └── Cart.js
│   │   │   ├── Orders/
│   │   │   │   └── Orders.js
│   │   │   ├── Products/
│   │   │   │   └── products.js
│   │   │   ├── User/
│   │   │   │   └── Users.js
│   │   │   └── index.js
│   │   ├── assets/
│   │   │   └── images/
│   │   │       ├── admin functions.gif
│   │   │       ├── google.png
│   │   │       ├── logo.jpg
│   │   │       ├── purchased-simulated.gif
│   │   │       ├── sadkawaii.gif
│   │   │       └── thanks.gif
│   │   ├── components/
│   │   │   ├── Containers/
│   │   │   │   ├── AdminContainers/
│   │   │   │   ├── CartContainer/
│   │   │   │   ├── OrderContainers/
│   │   │   │   ├── ProductContainers/
│   │   │   │   ├── UserContainers/
│   │   │   │   └── index.js
│   │   │   ├── views/
│   │   │   │   ├── AddProduct/
│   │   │   │   ├── AdminPanel/
│   │   │   │   ├── Buttons/
│   │   │   │   ├── CartView/
│   │   │   │   ├── CartWidget/
│   │   │   │   ├── EndBuy/
│   │   │   │   ├── ItemCount/
│   │   │   │   ├── ItemDetail/
│   │   │   │   ├── ItemList/
│   │   │   │   ├── Login/
│   │   │   │   ├── ModifyProduct/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── OrderFailed/
│   │   │   │   ├── OrderList/
│   │   │   │   ├── OrderUser/
│   │   │   │   ├── PageNotFound/
│   │   │   │   ├── SignIn/
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── features/
│   │   │   ├── cart/
│   │   │   │   └── cart.js
│   │   │   ├── order/
│   │   │   │   └── order.js
│   │   │   ├── products/
│   │   │   │   └── products.js
│   │   │   ├── user/
│   │   │   │   └── user.js
│   │   │   └── index.js
│   │   ├── routes/
│   │   │   ├── AdminRoutes/
│   │   │   │   └── PrivateRoute.jsx
│   │   │   ├── PublicRoutes/
│   │   │   │   └── PublicRoutes.jsx
│   │   │   └── index.js
│   │   ├── store/
│   │   │   └── store.js
│   │   ├── style/
│   │   │   └── fonts/
│   │   ├── Utils/
│   │   │   ├── Alerts/
│   │   │   ├── Magnifier/
│   │   │   └── index.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .env
│   ├── .gitignore
│   ├── netlify.toml
│   ├── package-lock.json
│   └── package.json
├── Server/
│   ├── config/
│   │   ├── DB/
│   │   │   └── connection.js
│   │   ├── Env/
│   │   │   └── variables.js
│   │   └── index.js
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── users/
│   │   │   └── index.js
│   │   ├── dal/
│   │   │   └── Dao/
│   │   │       ├── cart/
│   │   │       ├── orders/
│   │   │       ├── products/
│   │   │       ├── user/
│   │   │       └── index.js
│   │   ├── helpers/
│   │   │   └── logger.js
│   │   ├── middleware/
│   │   │   ├── cloudinary/
│   │   │   ├── hasspass/
│   │   │   └── passport/
│   │   ├── models/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── users/
│   │   │   └── index.js
│   │   ├── routes/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   ├── users/
│   │   │   └── index.js
│   │   ├── server/
│   │   │   ├── index.js
│   │   │   └── server.js
│   │   ├── services/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── products/
│   │   │   └── index.js
│   │   └── templates/
│   │       └── purchased-email.js
│   ├── .env
│   ├── .gitignore
│   ├── error.log
│   ├── package-lock.json
│   ├── package.json
│   └── warn.log
└── README.md