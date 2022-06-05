const Account = require('../../model/Account');
const User = require('../../model/User');
const { generateSession } = require('../../services/auth-service');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

module.exports.handleGoogleCallback = async function(req, res) {
  const { name, email } = req.user._json;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await User.findOne({
      email: lowerCaseEmail,
    })
      .populate({
        path: 'ownedAccount',
        model: 'Account',
      })
      .populate({
        path: 'currentProject',
        model: 'Project',
      })
      .exec();

    if (!user) {
      res.redirect(
        process.env.CLIENT_URL +
          '/auth/google-signup?email=' +
          encodeURIComponent(email) +
          '&username=' +
          encodeURIComponent(name)
      );
    }

    const account = user.ownedAccount;
    if (!user.confirmed) {
      return res.redirect(
        process.env.CLIENT_URL +
          '/auth/login?error=' +
          encodeURIComponent(
            'Your account is not confirmed yet. Please check your email.'
          ) + '&email=' +email
      );
    }

    const payload = generateSession(user, account, process.env.TOKEN_SECRET);
    res.redirect(
      process.env.CLIENT_URL +
        '/auth/login?user=' +
        encodeURIComponent(JSON.stringify(payload))
    );
  } catch (error) {
    return res.redirect(
      process.env.CLIENT_URL +
        '/auth/login?error=' +
        encodeURIComponent(error.message)
    );
  }
};

module.exports.handleLinkedInCallback = async function(req, res) {

};

module.exports.handleFacebookCallback = async function(req, res) {

};
