


var express = require("express");
app  = express(),
port = parseInt(process.env.PORT, 10) || 8080,
bodyParser = require('body-parser'),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
secret:'da illest developer',
resave: true,
saveUninitialized: true
}));


//Api
var Main = require("./api/main.api");

//Controller
var Api = require("./controllers/api.controller");
var Doc = require("./controllers/doc.controller");
var Demo = require("./controllers/demo.controller");
var Authentication = require("./controllers/authentication.controller.");

// models
const { User } = require('./models');
var server = require("http").Server(app);
server.listen(3000);

var io = require("socket.io")(server);
var path = require("path");

app.use((req, res, next) => {
res.locals["socketio"] = io;
res.locals["User"] = User;
next();
});

app.set("view engine", "pug");
//Store all HTML files in view folder.
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
//res.sendFile(__dirname+'/pages/index.html');
res.render("index", { title: "Hey", message: "Hello there!" });
});

app.get("/api", Api.index);

app.get("/about", Doc.index);

app.get("/demo", Demo.index);

app.get("/authentication", Authentication.index);

app.get("/authentication/signin", Authentication.signIn);

app.get("/authentication/signon", Authentication.signOn);

app.get("/demo_1", function(req, res, next) {
res.sendFile(__dirname + "/index.html", {
title: "Hey",
message: "Hello there!"
});
});

app.get("/login", function(req, res) {
//res.sendFile(__dirname+'/pages/index.html');
res.render("index", { title: "Hey", message: "Hello there!" });
});

app.get("/project", function(req, res) {
//res.sendFile(__dirname+'/pages/index.html');
res.render("index", { title: "Hey", message: "Hello there!" });
});

app.get("/demo", Api.demo.get);
app.post("/demo", Api.demo.post);

app.get("/api/v2/sendsms", Main.sendSMS);

io.on('connection',function(socket){
console.log(socket.id);
socket.on('update',(x)=>{
    console.log('update');
    io.emit('update','hello world'+JSON.stringify(x))});
console.log(socket.id);
socket.on('new-message',(x)=>{
    console.log('new-message');
    io.emit('new-message','hello world '+JSON.stringify(x))});
})
