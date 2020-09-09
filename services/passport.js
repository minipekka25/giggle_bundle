const passport = require("passport");
const GooleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const data = require("./DBadaptor");
const userSchema = require('../schema/user')


passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    
        done(null,user)
 
})

passport.use(
    new GooleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:"/auth/google/callback",
        proxy:true,
    },
        function (accessToken, refreshToken, profile, done) {
    
            var db = data.getDatabaseConnection('black_master')
            const user = db.model('user', userSchema)



            var query = user.where({ name: profile._json.name });
            query.findOne(function (err, kitten) {
                if (err) {
                    console.log('found error' + err)
                }
                if (kitten == null) {
                    let newUser = new user({
                        name: profile._json.name,
                        email: profile._json.email,
                        picture: profile._json.picture,
                        googleId: profile._json.sub,
                    })
                    newUser.save().then((data) => console.log('saved data' + data))
                }
            });
            /*
             use the profile info (mainly profile id) to check if the user is registerd in ur db
             If yes select the user and pass him to the done callback
             If not create the user and then select him and pass to callback
            */
            return done(null, profile);

        }
    )
    
)

