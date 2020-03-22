const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

async function insert(req, res) {
  try {
    const user = await userCtrl.insert(req.body);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}

router.route('/').post(asyncHandler(insert));
