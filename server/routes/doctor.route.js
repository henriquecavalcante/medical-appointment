const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const doctorCtrl = require('../controllers/doctor.controller');
const HttpCodes = require('../utils/http-status-codes');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

async function list(req, res) {
  try {
    const doctor = await doctorCtrl.list();
    res.json(doctor);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

async function insert(req, res) {
  try {
    const doctor = await doctorCtrl.insert(req.body);
    res.json(doctor);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

async function update(req, res) {
  try {
    const doctor = await doctorCtrl.update(req.params.id, req.body);
    res.json(doctor);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

async function remove(req, res) {
  try {
    const doctor = await doctorCtrl.remove(req.params.id);
    res.json(doctor);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

router.route('').get(asyncHandler(list));
router.route('').post(asyncHandler(insert));
router.route('/:id').put(asyncHandler(update));
router.route('/:id').delete(asyncHandler(remove));
