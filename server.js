var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));

var expectedUser = {
    username: "marei",
    password: "123"
};

passport.serializeUser(function (user, done) {
    console.log("2 - This would be triggered after verify function");
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});

passport.use(new LocalStrategy(function (username, password, done) {
    console.log("1 - This will be treggered first - " + username);

    if (username === expectedUser.username && password === expectedUser.password) {
        return done(null, {username, password});
    }
    else {
        return done(null, false, { message: "Incorrect credentials" });
    }
}));

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/dashboard');
});

app.get('/login', function(req, res) {
    res.send("<form method='post'><input name='username' palceholder='username'><br><input name='password' palceholder='password'><br><input type='submit'></form>");
});

app.get('/dashboard', function(request, response) {
    response.send("Welcome to dashboard!");
});

app.listen(3000);