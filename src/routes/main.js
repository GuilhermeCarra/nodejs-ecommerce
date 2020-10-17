// express initialization
const express = require("express");
const router = express.Router();
const config = require('../config/app-config.js');

// required libraries
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(config.sqlCon);
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

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

router.use(async function(req,res,next) {
    const UsersController = require('../controllers/users.js');
    const User = new UsersController();

    res.locals.isAuthenticated = req.isAuthenticated();

    try {
        res.locals.isAdmin = await User.isAdmin(req.session.passport.user);
    } catch {
        res.locals.isAdmin = false;
    }

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
        products = await Products.getPaginated(page = 0);
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

// cart page
router.get("/cart", authenticate(), async (req, res) => {
    const ProductsController = require('../controllers/products.js');
    const Products = new ProductsController();
    const CartController = require('../controllers/cart.js');
    const Cart = new CartController();
    let cartContent;
    let products;

    try {
        cartContent = await Cart.getContent(req.session.passport.user);
        cartContent = JSON.parse(cartContent.content);
        let idList = cartContent.map(({ id }) => id)
        idList = Array.from(new Set(idList)).toString();
        products = await Products.getByIdArray(idList);
    } catch {
        cartContent = false;
    }

    if (cartContent) products = JSON.parse(JSON.stringify(products))
    res.render(`${config.views}/public/cart.ejs`, {cart: cartContent, products: products});
});

// checkout process
router.get("/checkout", authenticate(), async (req, res) => {
    let formErrors = req.session.formErrors ? req.session.formErrors : false;
    req.session.formErrors = false;
    res.render(`${config.views}/public/checkoutProcess.ejs`, {errors: formErrors});
});

// checkout order
router.post("/checkout", authenticate(),
    [check('city').isLength({ min: 3 }),
    check('address').isLength({ min: 3 }),
    check('city').isLength({ min: 3 }),
    check('zip').isNumeric(),
    check('card').isNumeric(),
    check('expMonth').isLength({min: 2, max: 2}),
    check('expYear').isLength({min: 2, max: 2}),
    check('cvCode').isLength({min: 3, max: 3})],
async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        req.session.formErrors = errors.array();
        res.redirect('/checkout');

    } else {

        const CartController = require('../controllers/cart.js');
        const Cart = new CartController();

        const OrdersController = require('../controllers/orders.js');
        const Orders = new OrdersController();

        let cartContent;
        let orderId;
        let userId = req.session.passport.user;

        try {
            cartContent = await Cart.getContent(userId);
            cartContent = JSON.parse(cartContent.content);
            orderId = await Orders.create({costumer_id: userId});
            Orders.saveOrderProducts(orderId, cartContent)
            Cart.empty(userId);
        } catch(e) {
            throw e;
        }

        res.render(`${config.views}/public/checkout.ejs`);
    }

});

// contact page
router.get("/contact", (req, res) => {
    res.render(`${config.views}/public/contact.ejs`);
});

// auth verify middleware
function authenticate () {
	return (req, res, next) => {
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
