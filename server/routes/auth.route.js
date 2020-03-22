const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();
module.exports = router;

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next();
}

function login(req, res) {
  const { user } = req;
  const token = authCtrl.generateToken(user);
  res.json({ user, token });
}

router.post('/register', asyncHandler(register), login);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
router.get('/me', passport.authenticate('jwt', { session: false }), login);
