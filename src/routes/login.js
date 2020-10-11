// express initialization
const express = require("express");
const router = express.Router();

// config and controller
require('dotenv').config();
const config = require('../config/app-config.js');
const UsersController = require('../controllers/users.js');
const User = new UsersController();

// required libraries
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(config.sqlCon);
const bodyParser = require('body-parser')
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// global middleware
router.use(session({
    name: process.env.SESSION_NAME,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize());

router.use(passport.session());

router.use(bodyParser.json()); // support json encoded bodies

router.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

router.use(flash());

// passport configurations
passport.use('local', new LocalStrategy(async function (email, password, done) {
    let user;

    try {
        user = await User.getUserByEmail(email);
    } catch (e) {
        return done(null, false, { message: 'No user with that email' })
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Password incorrect' })
        }
    } catch (e) {
        return done(e)
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try{
        let user = User.getUserById(id)
        done(null, user);
    } catch (e) {
        throw e;
    }
});

// login page
router.get("/", (req, res) => {
    res.render(`${config.views}/public/login.ejs`);
});

router.post("/", passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login',
    failureFlash: true
}));

// logout
router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// registration page
router.get("/register", (req, res) => {
    res.render(`${config.views}/public/register.ejs`);
});

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = {name: req.body.name, email: req.body.username, password: hashedPassword};
        User.save(user);
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

// test
router.get("/success", authenticate(),  (req, res) => {
    res.send('success')
});

// auth verify middleware
function authenticate () {
	return (req, res, next) => {
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;