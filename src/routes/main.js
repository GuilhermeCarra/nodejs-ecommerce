// express initialization
const express = require("express");
const router = express.Router();
const config = require('../config/app-config.js');

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
router.get("/order", async (req, res) => {
    const ProductsController = require('../controllers/products.js');
    const Products = new ProductsController();

    try {
        product = await Products.getProduct(req.query.p);
    } catch (e) {
        throw e;
    }

    res.render(`${config.views}/public/order.ejs`, {product: product});
});

module.exports = router;
