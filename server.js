'use strict';

// Module dependencies.
var application_root = __dirname,
    fs = require('fs'),
    dal = require('dal'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    express = require( 'express' ), //Web framework
	mongoose = require( 'mongoose' ); //MongoDB integration

//passport session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  dal.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
      return next(); }
  req.session.returnUrl = req.url;
  res.redirect('/login.html');
};

//local auth
passport.use(new LocalStrategy(
  function(username, password, done) {
    dal.getUserByMail(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      return done(null, user);
    });
  }
));

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://petsov:trooper3421@widmore.mongohq.com:10000/FestsDB' );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );
    
    app.use( express.cookieParser() );

    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	//app.use( express.static( path.join( application_root, 'site') ) );
    
    app.use("/", express.static(application_root + "/static"));

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
    
    
});

// Routes

//admin
app.get('/admin/*', 
    ensureAuthenticated
);

//login
app.post('/login', function(request, response, next){
    passport.authenticate('local', { successRedirect: request.session.returnUrl ? request.session.returnUrl : "/",
                                   failureRedirect: '/login.html',
                                   failureFlash: false })(request, response, next);
});
//     passport.authenticate('local', { successRedirect: '/',
//                                   failureRedirect: '/login.html',
//                                   failureFlash: false })
// );

//Get a user by mail
app.get('/users/:mail', function(request, response) {
    dal.getUserByMail(request.params.mail, function(err, user){
        response.send(user);
    });
});

//Create a user
app.post('/users', function(request, response){
    dal.createUser(request.body, function(user){
        response.send(user);
    });
});

//Get all songs
app.get( '/songs', function( request, response ) {
    dal.getAllSongs(function(songs){
        response.send(songs);
    });
});

//Get a song by id
app.get( '/songs/:songId', function( request, response ) {
    dal.getSongById(request.params.songId, function(song){
        response.send(song);
    });
});

//Get songs by FestId and SemiFinal
app.get('/songs/:festId/:semifinal', function(request, response){
    dal.getSongByFestAndSemi(request.params.festId, request.params.semifinal, 
    function(songs){
        response.send(songs);
    });
})

// Get a song by id
app.get( '/songs/:songId', function( request, response ) {
    dal.getSongById(request.params.songId, function(song){
        response.send(song);
    })
});

//Add a song
app.post('/songs', function(request, response){
     dal.createSong(request.body, function(song){
         response.send(song);
     });
});

//Update a song
app.put('/songs/:songId', function(request, response){
    dal.updateSong(request.params.songId, request.body, function(song){
        response.send(song);
    });
});

app.delete('/songs/:songId', function(request, response){
    dal.deleteSong(request.params.songId, function(e){
        if(e){
            response.send(500, e);
        }
        else{
            response.send(200);
        }
    });
});

//Get all fests
app.get( '/fests', function( request, response ) {
    dal.getAllFests(function(fests){
        response.send(fests);
    });
});

//Get a fest by id
app.get( '/fests/:festId', function( request, response ) {
    dal.getFestById(request.params.festId, function(fest){
        response.send(fest);
    });
});

//Insert a fest
app.post('/fests', function(request, response){
    dal.createFest(request.body, function(fest){
        response.send(fest);
    });
});

//Update a fest
app.put('/fests/:festId', function(request, response){
    dal.updateFest(request.params.festId, request.body, function(fest){
        response.send(fest);
    });
});

//Delete a fest
app.delete('/fests/:festId', function(request, response){
    dal.deleteFest(request.params.festId, function(e){
        if(e){
            response.send(500, e);
        }
        else{
            response.send(200);
        }
    });
});

//Get all countries
app.get( '/countries', function( request, response ) {
    dal.getAllCountries(function(countries){
        response.send(countries);
    });
});

//Get a country by id
app.get( '/countries/:countryId', function( request, response ) {
    dal.getCountryById(request.params.countryId, function(country){
        response.send(country);
    });
});

//Insert a country
app.post('/countries', function(request, response){
    dal.createCountry(request.body, function(country){
        response.send(country);
    });
});

//Update a country
app.put('/countries/:countryId', function(request, response){
    dal.updateCountry(request.params.countryId, request.body, function(country){
        response.send(country);
    });
});

//Delete a country
app.delete('/countrys/:countryId', function(request, response){
    dal.deleteCountry(request.params.countryId, function(e){
        if(e){
            response.send(500, e);
        }
        else{
            response.send(200);
        }
    });
});


app.listen(3321);

console.log(' > http server started');