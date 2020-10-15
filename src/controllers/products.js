const config = require('../config/app-config.js');
const mysql = require('mysql');

const controller = class ProductsController {
    constructor() {
        // mysql connection
        this.con = mysql.createConnection(config.sqlCon);
    }

    getAll(){
        return new Promise((resolve,reject) => {
            this.con.query('SELECT * FROM `products`', function (err, result) {
                if (result.length < 1) {
                    reject(new Error("No registered products"));
                } else {
                    resolve(result);
                }
            });
        });
    }

    getProduct(id) {
        return new Promise((resolve,reject) => {
            this.con.query('SELECT * FROM products JOIN sizes ON products.id = sizes.product_id WHERE id ='+id, function (err, result) {
                if (result.length < 1) {
                    reject(new Error("Product not registered"));
                } else {
                    resolve(result);
                }
            });
        });
    }

    getByIdArray(idList) {
        return new Promise((resolve,reject) => {
            this.con.query('SELECT id, title, sizes.size, sizes.price FROM products JOIN sizes ON products.id = sizes.product_id WHERE `id` IN ('+idList+')', function (err, result) {
                if(err) reject(err)
                if (result == undefined) {
                    reject(new Error("Products not registered"));
                } else {
                    resolve(result);
                }
            });
        });
    }

    checkStock(id, size) {
        return new Promise((resolve,reject) => {
            this.con.query('SELECT stock FROM sizes WHERE product_id = '+id+' AND size = "'+size+'"', function (err, result) {
                if(err) reject(err)
                if (result.length < 1) {
                    reject(new Error("Product not registered"));
                } else {
                    resolve(result[0]);
                }
            });
        });
    }
}

module.exports = controller;













