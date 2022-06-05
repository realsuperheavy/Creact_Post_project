const StringUtil = require("../../utilities/string-util");
const User = require("../../model/User");
const Invitation = require("../../model/Invitation");
const Account = require("../../model/Account");
const { generateSession } = require("../../services/auth-service");
const mail = require("../../services/mail-service");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

//Check And Validate Request (LOGIN METHODE)
module.exports.index = async function (req, res) {
    const validation = validateIndex(req.body);
    //No Valid Request
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }
    //Find by Email For Login
    const user = await User.findOne(
        { email: req.body.email.toLowerCase() },
        (error) => {
            if (error) {
                return res.status(500).json();
            }
        }
    )
        .populate({
            path: "ownedAccount",
            model: "Account",
        })
        .populate({
            path: "currentProject",
            model: "Project",
        })
        .exec(); //returns promise
    if (!user) {
        return res.status(404).json({
            message:
                "Couldn't find your Account, Please provide a valid Username.",
        });
    }
    //Compare Password In DataBase One From User And The Encrypted
    const passwordsMatch = await User.passwordMatches(
        req.body.password,
        user.password
    );
    if (!passwordsMatch) {
        return res.status(401).json({
            message:
                "Wrong password. Try again or click Forgot password to reset it.",
        });
    }
    const account = user.ownedAccount;
    if (!user.confirmed) {
        return res.status(401).json({
            message:
                "Your account is not confirmed yet. Please check your email.",
        });
    }
    const payload = generateSession(user, account, process.env.TOKEN_SECRET);
    return res.status(200).json({ user: payload });
};
/* Login by Invitation */
module.exports.loginInvitation = async function (req, res) {
    const invitation = await Invitation.findOne(
        { token: req.params.token },
        (error) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
        }
    );
    const validation = validateIndex(req.body);
    //No Valid Request
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }
    const user = await User.findOne(
        { email: req.body.email.toLowerCase() },
        (error, user) => {
            if (error) {
                return res.status(500).json();
            }
            if (!user) {
                return res.status(401).json({
                    message:
                        "Couldn't find your Account, Please provide a valid Username.",
                });
            }
            //Compare Password In DataBase One From User And The Encrypted
            const passwordsMatch = User.passwordMatches(
                req.body.password,
                user.password
            );
            if (!passwordsMatch) {
                return res.status(401).json({
                    message:
                        "Wrong password. Try again or click Forgot password to reset it.",
                });
            }
        }
    );
    //Update Memberships document
    Account.findOneAndUpdate(
        { _id: invitation.account },
        {
            $push: { membership: { access: invitation.role, user: user._id } },
        },
        { new: true }
    ).exec(async function (err, account) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!account) {
            return res.status(401).json({
                message: "Account Not Found",
            });
        }
        await User.findOne(
            { _id: user._id },
        )
            .exec(function (err, user) {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                if (!user) {
                    return res.status(401).json({
                        message: "user Not Found",
                    });
                }
                const payload = generateSession(
                    user,
                    account,
                    process.env.TOKEN_SECRET
                );
                return res.status(200).json({ user: payload });
            });
    });
};

//Validate Request From FrontEnd (Username & Password)
function validateIndex(body) {
    let errors = "";
    if (StringUtil.isEmpty(body.email)) {
        errors += "Email is required.";
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += "Password is required.";
    }
    //I return An Object
    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors,
    };
}
//FORGOT PASSWORD, SEND EMAIL WITH TOKEN
module.exports.forgotPassword = async function (req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email }, (err, user) => {
        if (!user) {
            return res.status(404).json({
                message:
                    "User with this email does not exist. Please create your account.",
            });
        }
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    });
    //Exit Process
    if (!user) {
        return;
    }
    //Gen Reset Token
    const token = jwt.sign({ _id: user.id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: "180m",
    });
    // Send Reset Password Email
    const resetPasswordEmail = await mail.resetPassword(user, token);
    // Save Reset Token in DB
    await user
        .updateOne({ resetLink: token }, function (err) {
            if (err) {
                return res
                    .status(400)
                    .json({ message: "Reset password link error" });
            } else {
                console.log("ResetLink Updated");
            }
        })
        .exec(); //returns promise
    await mail.mg.messages().send(resetPasswordEmail, function (error) {
        if (error) {
            return res.status(400).json({
                message: error.message,
            });
        } else {
            console.log("Email Has Been Sent");
        }
        return res.status(200).json({
            message: `Email has been sent in your inbox "${email}", kindly follow the instructions...`,
        });
    });
};
//Reset Password
module.exports.resetPassword = function (req, res) {
    const { resetLink, newPass } = req.body;
    if (resetLink) {
        jwt.verify(
            resetLink,
            process.env.RESET_PASSWORD_KEY,
            function (error, decodedData) {
                if (error) {
                    return res.status(401).json({
                        message: "Incorrect token or it is expired.",
                    });
                }
                User.findOne({ resetLink }, (err, user) => {
                    if (err || !user) {
                        return res
                            .status(400)
                            .json({
                                message: "User with this token does not exist.",
                            });
                    }
                    const obj = {
                        password: newPass,
                        resetLink: "",
                    };
                    user = _.extend(user, obj);
                    user.save((err) => {
                        if (err) {
                            return res
                                .status(400)
                                .json({ message: "Reset password error" });
                        } else {
                            return res.status(200).json({
                                message:
                                    "Congratulations 🎉 Your Password has been changed.",
                            });
                        }
                    });
                });
            }
        );
    } else {
        return res.status(401).json({ message: "Authentication error!" });
    }
};
//Confirm Email Account Link
module.exports.confirmAccount = async function (req, res) {
    const token = req.params.token;
    if (token) {
        const decodedToken = jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            function (err, decodedToken) {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: "Incorrect or Expired Link. 🤔" });
                }
                return decodedToken;
            }
        );
        const user = await User.findOne(
            { email: decodedToken.user.email },
            (error, user) => {
                if (!user) {
                    return res
                        .status(401)
                        .json({ message: "User doesn't exist! 🤔" });
                }
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
            }
        ).populate({
            path: "ownedAccount",
            model: "Account",
        });
        const account = user.ownedAccount;
        if (!user.confirmed) {
            User.findOneAndUpdate(
                { _id: decodedToken.user.id },
                {
                    $set: {
                        confirmed: true,
                    },
                },
                { new: true }
            )
                .populate({
                    path: "currentProject",
                    model: "Project",
                })
                .exec(function (err, userUpdated) {
                    if (err) {
                        console.log(err);
                    }
                    const payload = generateSession(
                        userUpdated,
                        account,
                        process.env.TOKEN_SECRET
                    );
                    res.json({
                        user: payload,
                        message:
                            "Congratulations 🎉 Email Confirmed Successfully!",
                    });
                });
        } else {
            res.json({ message: "This account has already been activated." });
        }
    } else {
        return res.status(400).json({ message: "Something went wrong!!!" });
    }
};
