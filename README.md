# express jwt auth

1. install 
# npm express-jwt

2. Created Account with Auth0 to use auth .env variables 
# AUTH0_CLIENT_ID=OaTQ93EYPIqiO7LtR0aOz0D4AXpWQ4vH 
# AUTH0_CLIENT_SECRET=OMgVEg6AJAFQzF0whAtIw2sOX0nuvz-DhpkGRJyDVGGGz-IgeVrN4RmrT1pSbAUQ 
# AUTH0_DOMAIN=bms64.auth0.com 



serverB file contains a jwt authentications code.


# jwt- authentication
var jwt = require('express-jwt');


var jwtCheck = jwt({
  secret: new Buffer('OMgVEg6AJAFQzF0whAtIw2sOX0nuvz-DhpkGRJyDVGGGz-IgeVrN4RmrT1pSbAUQ', 'base64'),
  audience: 'OaTQ93EYPIqiO7LtR0aOz0D4AXpWQ4vH'
});




//API Router
var router = express.Router();// calling the outside routes 
var index = require('./routes/index').router;

app.all('/*', function(req, res, next) {
  next();
});

app.use('/api',jwtCheck);//pass it to authentication

app.use('/api',index);



# running following URL,

# http://localhost:5000/api/sport
with :  Authorization: Bearer  OaTQ93EYPIqiO7LtR0aOz0D4AXpWQ4vH


# this is not working 

Error: UnauthorizedError: Format is Authorization: Bearer [token]
