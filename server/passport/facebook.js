const Strategy = require('passport-facebook');

function applyFacebookPassportStrategy(passport) {
  passport.use(new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.VUE_APP_API_URL}${process.env.FACEBOOK_CALLBACK_PATH}`
  },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }));
}
module.exports.applyFacebookPassportStrategy = applyFacebookPassportStrategy;