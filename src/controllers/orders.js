const config = require('../config/app-config.js');
const mysql = require('mysql2');

const controller = class OrdersController {
    constructor() {
        // mysql connection
        this.con = mysql.createConnection(config.sqlCon);
    }

    create(user) {
        return new Promise((resolve,reject) => {
            this.con.query('INSERT INTO orders SET ?', user, function (err, result) {
                if(err) reject(new Error('Database connection error'));
                resolve(result.insertId);
            });
        });
    }

    saveOrderProducts(orderId, cartContent) {

        for (let i = 0; i < cartContent.length; i++) {
            const format = ({ id, quantity, size }) => [orderId, parseInt(id), quantity, size ];
            cartContent[i] = format(cartContent[i]);
        }

        return new Promise((resolve,reject) => {
            this.con.query('INSERT INTO orders_items VALUES ?', [cartContent] , function (err, result) {
                if(err) reject(new Error(err));
                resolve(result);
            });
        });
    }
}

module.exports = controller;