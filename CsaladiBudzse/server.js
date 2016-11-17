var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var felh = require('./js/FelhasznaloKezelo.js');
var jog = require('./js/Jogosultsag.js');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



app.get('/', function (req, res) {
    res.render('Login.html');
});

app.get('/profil', function (req, res) {
    res.render('Profil.html');
});

app.post('/profil/getcsalad', function (req, res) {
    felh.getAllSzemely(req, res);
});

app.post('/profil/jogosultsag', function (req, res) {
    console.log(req);
    var temp = "";
    jog.addJogosultsag(req, res);
});

var http = require("http");
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});