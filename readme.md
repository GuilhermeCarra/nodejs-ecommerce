# e-commerce with Node.js (MVC Pattern)
---
## Overview
This project is focused in develop a Web MVC application using node.js, mysql and related technologies. It consists of a client facing web application that users can connect to in order to see the products being sold and make purchases, a dashboard frontend application that the employees can use to perform CRUD operations on the product catalog of the application, and a backend server that will be used to host api endpoints and the database to store all the information.

## Screenshots

<a data-flickr-embed="true" href="https://www.flickr.com/photos/190744579@N08/50505312657/in/dateposted-public/" title="burgers-collage"><img src="https://live.staticflickr.com/65535/50505312657_0744e5142a_o.jpg" width="3264" height="1984" alt="burgers-collage"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

## Getting Started
After cloning this repository, excute the folowing commands to test it:

* Installing dependencies:
````
npm install
````
* Configure your **.env** file:
````
Based on the file ".env.example"
````
* Creating a database:
````
mysql > create database "name in your .env file"
````
* Populating the database:
````
npm run database
````
* Starting the server (on port specified in the **.env** file):
````
npm run node
````
## Credentials
The "database script" populates some **users** on DB with different roles. Use the following examples:
* Regular user
````
email: user@user.com
password: 123456
````
* Employee
````
email: employee@employee.com
password: 123456
````
* Admin
````
email: admin@admin.com
password: 123456
````
## Author

* **Guilherme Carra** - [GitHub](https://github.com/GuilhermeCarra/) - [Glitch](https://glitch.com/@GuilhermeCarra/) - [Linkedin](https://www.linkedin.com/in/guilherme-carra/)