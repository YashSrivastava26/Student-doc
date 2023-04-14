const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const verifyAndGetId = require("../middleware/tokenAuth");

const JWT_SECRET = "yjafdhHFgj33ha343s32fdsdf";

//Route 2: create a new user using: POST '/api/auth/signup', no token required
router.post(
  "/signup",

  //validators
  body("name", "name can't be empty").isLength({ min : 1 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "password length should be atlest 8").isLength({ min: 8 }),

  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().at(0) });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({errors:{param: 'Invalid credentials', msg: "user with this email already exists" }});
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
      });

      const tokenData = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(tokenData, JWT_SECRET);

      res.json({token});
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ param: 'server', msg: "Internal Server Error" });
    }
  }
);

//Route 1: login a existing user using: POST '/api/auth/login', no token required
router.post(
  "/login",

  //validators
  body("email", "enter a valid email").isEmail(),
  body("password", "password can not be empty").exists(),

  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().at(0) });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid Credentials, Try Again" });
      }

      const passwordChk = await bcrypt.compare(password, user.password);

      if (!passwordChk) {
        return res
          .status(400)
          .json({errors:{param: 'Invalid credentials', msg: "Invalid Credentials, Try Again" }});
      }

      const tokenData = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(tokenData, JWT_SECRET);
      return res.json({token});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ param: 'server', msg: "Internal Server Error" });
    }
  }
);


//Route 3: get user details using: Get '/api/auth/get-user'  , token required
router.get("/get-user", verifyAndGetId, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
