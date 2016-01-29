/*Define depemdencies*/
var express  = require('express'),
    app      = express();
    nodemailer = require("nodemailer"),
    path     = require('path'),
    bodyParser = require('body-parser'),
    http = require('http'),
    cors = require('cors'),
    expressValidator = require('express-validator');


//jwt- authentication
var jwt = require('express-jwt');


var jwtCheck = jwt({
  secret: new Buffer('OMgVEg6AJAFQzF0whAtIw2sOX0nuvz-DhpkGRJyDVGGGz-IgeVrN4RmrT1pSbAUQ', 'base64'),
  audience: 'OaTQ93EYPIqiO7LtR0aOz0D4AXpWQ4vH'
});


//code ended for auth



/*app use*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors()); //to allow origins

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
 
    connection(mysql,{
        host     : 'devbms.cnwx0gkwkd5w.ap-southeast-1.rds.amazonaws.com',
        user     : 'devbms_userInst',
        password : 'U8X#pAwWR!M8',
        port     : '3306',
        database : 'g2gmobile_db',
        multipleStatements: true,
        debug    : false //set true if you wanna see debug logger
    },'request')

);


/*
    Your middlewares or setups usually around here
*/



//API Router
var router = express.Router();// calling the outside routes 
var index = require('./routes/index').router;

app.all('/*', function(req, res, next) {
  next();
});

app.use('/api',jwtCheck);//pass it to authentication

app.use('/api',index);

//start Server
var server = app.listen(process.env.PORT || 5000,function(){
 
   console.log("Listening to port %s",server.address().port);
});
