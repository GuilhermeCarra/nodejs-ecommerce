const config = require('../config/app-config.js');
const mysql = require('mysql');

const controller = class ProductsController {
    constructor() {
        // mysql connection
        this.con = mysql.createConnection(config.sqlCon);
    }

    getContent(user) {
        return new Promise((resolve,reject) => {
            this.con.query('SELECT content FROM `cart` WHERE `user_id` ="'+user+'"', function (err, result) {
                if(err) reject(new Error('Database connection error'));
                if(result == undefined) {
                    reject();
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    addToCart(newProducts, user){
        return new Promise( async(resolve,reject) => {

            try {
                let cartContent = await this.getContent(user);
                let cartProducts = JSON.parse(cartContent.content);

                for(let cartProduct of cartProducts) {
                    for(let newProduct of newProducts) {
                        if (cartProduct.id == newProduct.id && cartProduct.size == newProduct.size) {
                            cartProduct.quantity = newProduct.quantity + cartProduct.quantity;
                            let index = newProducts.indexOf(newProduct);
                            newProducts.splice(index, 1);
                        }
                    }
                }

                cartProducts = JSON.stringify(cartProducts.concat(newProducts));

                this.con.query('UPDATE `cart` SET `content` = ? WHERE `user_id` = ?', [cartProducts,user], function (err, result) {
                    if(err) reject(new Error('Database connection error'));
                    resolve('Added to the cart!');
                });

            } catch {
                let cartRow = {user_id: user, content: JSON.stringify(newProducts)};
                this.con.query('INSERT INTO `cart` SET ?', cartRow, function (err, result) {
                    if(err) reject(new Error('Database connection error'));
                    resolve('Added to the cart!');
                });
            }
        });
    }

    update(updateProduct, user) {
        return new Promise( async(resolve,reject) => {

            try {
                let cartContent = await this.getContent(user);
                let cartProducts = JSON.parse(cartContent.content);
                let found = false;

                for (let cartProduct of cartProducts) {
                    if (cartProduct.id == updateProduct.id && cartProduct.size == updateProduct.size) {
                        found = true;
                        if (updateProduct.quantity > 0) {
                            cartProduct.quantity = updateProduct.quantity;
                        } else {
                            let index = cartProducts.indexOf(cartProduct);
                            cartProducts.splice(index, 1);
                        }
                    }
                }

                if (!found) cartProducts.push(updateProduct);

                cartProducts = JSON.stringify(cartProducts);

                this.con.query('UPDATE `cart` SET `content` = ? WHERE `user_id` = ?', [cartProducts,user], function (err, result) {
                    if(err) reject(new Error('Database connection error'));
                    resolve('Added to the cart!');
                });

            } catch {
                reject(new Error('Could not access cart'))
            }
        });
    }

    empty(user) {
        return new Promise((resolve,reject) => {
            this.con.query('DELETE FROM `cart` WHERE `user_id` ="'+user+'"', function (err, result) {
                if(err) {
                    reject(new Error('Database connection error'))
                } else {
                    resolve('Cart emptied');
                }
            });
        });
    }
}

module.exports = controller;
