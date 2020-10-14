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













/* INSERT INTO products (title,description) values
('The Original','Hamburger 100% Beef 🐂, american cheese 🧀, bacon 🥓, tomato 🍅, lettuce 🥗 and our famous sauce.');

INSERT INTO sizes (product_id,price,size,stock) values
(1, 9.50 ,'L', 20),
(1, 8.50 ,'M', 33),
(1, 7.50 ,'P', 10);

create table products (
id INT AUTO_INCREMENT PRIMARY KEY,
title varchar(20),
description varchar(200)
); */

/* create table sizes (
    product_id INT,
    size varchar(3),
    price DECIMAL(10,2),
    stock int(10),
    FOREIGN KEY(product_id) REFERENCES products(id)
); */