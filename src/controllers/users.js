const config = require('../config/app-config.js');
const mysql = require('mysql');

const controller = class UsersController {
    constructor() {
        // mysql connection
        this.con = mysql.createConnection(config.sqlCon);
     }

    save(user) {
        this.con.query('INSERT INTO users SET ?', user, function (err, result) {
            if (err) throw error;
        });
    }

    getUserByEmail(email){
        return new Promise((resolve,reject) => {
            this.con.query('SELECT * FROM `users` WHERE `email` = "'+email+'"', function (err, result) {
                if (result.length < 1) {
                    reject(new Error("User not found"));
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    getUserById(id){
        console.log(id)
        return new Promise((resolve,reject) => {
            this.con.query('SELECT * FROM `users` WHERE `id` = "'+id+'"', function (err, result) {
                if (result.length < 1) {
                    reject(new Error("User not found"));
                } else {
                    resolve(result[0]);
                }
            });
        });
    }
}

module.exports = controller;