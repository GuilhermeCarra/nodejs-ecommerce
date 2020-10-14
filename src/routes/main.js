// express initialization
const express = require("express");
const router = express.Router();
const config = require('../config/app-config.js');

// required libraries
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

router.use(passport.initialize());
router.use(passport.session());

router.use(function(req,res,next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// Index page
router.get("/", (req, res) => {
    res.render(`${config.views}/public/index.ejs`);
});

// Products page
router.get("/hamburguers", async (req, res) => {
    const ProductsController = require('../controllers/products.js');
    const Products = new ProductsController();

    try {
        products = await Products.getAll();
    } catch (e) {
        throw e;
    }

    res.render(`${config.views}/public/hamburguers.ejs`, {products: products});
});

// Product order page
router.get("/order", authenticate(), async (req, res) => {
    const ProductsController = require('../controllers/products.js');
    const Products = new ProductsController();

    try {
        product = await Products.getProduct(req.query.p);
    } catch (e) {
        throw e;
    }

    res.render(`${config.views}/public/order.ejs`, {product: product});
});

// auth verify middleware
function authenticate () {
	return (req, res, next) => {
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
