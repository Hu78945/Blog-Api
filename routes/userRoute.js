const router = require("express").Router();
const User = require("../models/userSchema");
const { authenticateToken } = require("../authentication/auth");

//get a specif user details
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
