var router = require('express').Router();
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

router.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool'
}));

// router.use(function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   //console.log('req.session', req.session);
//   next();
// });
router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new GoogleStrategy({
        clientID: '832574172744-eg7qlejn2d3jv3jglvk4sli3miv29bc5.apps.googleusercontent.com',
        clientSecret: 'C_LPxuwk8CBgX1uWCVzBYI9T',
        callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
    },
    // google will send back the token and profile
    function (token, refreshToken, profile, done) {
        //the callback will pass back user profilie information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
        /*
        --- fill this part in --- */
		console.log('---', 'in verification callback', profile, '---');
		User.findOne({"google.id": profile.id})
		.then(function(user){
			if(user) return user;
			else {
				return User.create({
					name: profile.displayName,
					photo: profile.photos[0].value,
					email: profile.emails[0].value,
					google: {
						id: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						token: token
					}
				})
			}
		})
		.then(function(user){
			done(null, user)
		})
		.catch(done)
    })
);

passport.serializeUser(function (user, done) {
    done(null, user._id)
});
// passport.deserializeUser(function (id, done) {
// 	User.findById(id)
// 	.then(function(user){
// 		done(null, user)
// 	})
// 	.catch(done);
    
// });

passport.deserializeUser(function (id, done) {
    User.findById(id, done);
});
//google authentication and login 
router.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/#/home',
    failureRedirect : '/'
  }));







module.exports = router;












