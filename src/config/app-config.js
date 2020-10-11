const path = require('path');

const config = {
    'root' : path.join(__dirname , '/../../'),
    'views' : path.join(__dirname , '/../views'),
    'controllers' : path.join(__dirname , '/../controllers'),
    'sqlCon' : {
        host: "localhost",
        user: "root",
        password: "",
        database: "ecommerce",
        charset : 'utf8mb4'
    }
}

module.exports = config;