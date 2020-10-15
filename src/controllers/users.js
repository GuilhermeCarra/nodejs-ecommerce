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

    update(name, email, user) {
        return new Promise((resolve,reject) => {
            this.con.query('UPDATE `users` SET `name` = ? , `email` = ? WHERE `id` = ?', [name,email,user] , function (err, result) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve('Success');
                }
            });
        });
    }

    updatePassword(hashed, user) {
        return new Promise((resolve,reject) => {
            this.con.query('UPDATE `users` SET `password` = ? WHERE `id` = ?', [hashed,user] , function (err, result) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve('Success');
                }
            });
        });
    }

}

module.exports = controller;