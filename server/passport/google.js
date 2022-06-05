const Strategy = require('passport-google-oauth20');

function applyGooglePassportStrategy(passport) {
  passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.VUE_APP_API_URL}${process.env.GOOGLE_CALLBACK_PATH}`
  },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }));
}
module.exports.applyGooglePassportStrategy = applyGooglePassportStrategy;