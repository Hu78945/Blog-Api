const router = require("express").Router();
const User = require("../models/userSchema");
const RefershToken = require("../models/refreshToken");
require("dotenv").config();

const {
  authenticateToken,
  GenrateAcessToken,
} = require("../authentication/auth");
const jwt = require("jsonwebtoken");

//Register a user
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await newUser.save();
    const { password, ...other } = newUser._doc;
    const token = GenrateAcessToken(newUser);
    res.status(200).json({ ...other, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const { password, ...other } = user._doc;
    !user && res.status(404).json("User not found.");
    if (user.password === req.body.password) {
      const token = GenrateAcessToken(user);
      const refershToekn = GenrateAcessToken(user);
      const storeRefereshToken = new RefershToken({
        refrehToken: refershToekn,
      });
      await storeRefereshToken.save();
      return res.status(200).json({ ...other, token, refershToekn });
    } else {
      return res.status(203).json("Incorrect Passoword");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Refersh The Token
router.post("/refershtoken", async (req, res) => {
  try {
    const token = await RefershToken.findOne({
      refershToken: req.body.refershToken,
    });
    await token.deleteOne();
    res.status(200).json("Token have been delted");
    //token.save();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
