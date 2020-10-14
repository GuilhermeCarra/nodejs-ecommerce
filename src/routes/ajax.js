// express initialization
const express = require("express");
const router = express.Router();
const config = require('../config/app-config.js');

// required libraries
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(config.sqlCon);

// global middleware
router.use(session({
    name: process.env.SESSION_NAME,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.use(passport.initialize());
router.use(passport.session());

// Check if there's stock to add product on cart
router.get("/checkStock", async (req, res) => {
    const ProductsController = require('../controllers/products.js');
    const Products = new ProductsController();

    try {
        stock = await Products.checkStock(req.query.id, req.query.size);
    } catch (e) {
        throw e;
    }
    res.send(stock);
});

// Add products to cart
router.post("/addToCart", async (req, res) => {
    const CartController = require('../controllers/cart.js');
    const Cart = new CartController();

    let response = await Cart.addToCart(req.body.addToCart, req.session.passport.user);

    res.send(response)
});

module.exports = router;
