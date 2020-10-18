# e-commerce with Node.js (MVC Pattern)
---
## Pill Overview
In this project you will develop a Web focused MVC application using node.js, mysql and related technologies. It will consist of a client facing web application that users can connect to in order to see the products being sold and make purchases, a dashboard frontend application that the employees can use to perform CRUD operations on the product catalog of the application, and a backend server that will be used to host api endpoints and the database to store all the information.

## Getting Started
After cloning this repository, excute the folowing commands to test it:
````
composer global require laravel/installer
````
````
composer install
````
````
php artisan key:generate //after created and configured the .env file
````
````
mySQL > CREATE DATABASE (db_name on your .env file)
````
````
php artisan migrate
````
````
php artisan db:seed //populate SQL database (it could take some minutes)
````
````
php artisan serv //check the project
````
## Credentials
To log on the network you can:
* **register** yourself
* or take a look at a **profile** created with faker/seeder:
````
mySQL > select email from users; // choose a email from the database
email: (from database)
password: password
````
## Authors

* **Guilherme Carra** - [GitHub](https://github.com/GuilhermeCarra/) - [Glitch](https://glitch.com/@GuilhermeCarra/)