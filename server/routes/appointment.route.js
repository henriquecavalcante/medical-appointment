const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const appointmentCtrl = require('../controllers/appointment.controller');
const HttpCodes = require('../utils/http-status-codes');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

async function list(req, res) {
  try {
    const appointment = await appointmentCtrl.list();
    res.json(appointment);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

async function insert(req, res) {
  try {
    const appointment = await appointmentCtrl.insert(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

async function update(req, res) {
  try {
    const appointment = await appointmentCtrl.update(req.params.id, req.body);
    res.json(appointment);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

async function remove(req, res) {
  try {
    const appointment = await appointmentCtrl.remove(req.params.id);
    res.json(appointment);
  } catch (error) {
    res.status(HttpCodes.BAD_REQUEST).json(error);
  }
}

router.route('').get(asyncHandler(list));
router.route('').post(asyncHandler(insert));
router.route('/:id').put(asyncHandler(update));
router.route('/:id').delete(asyncHandler(remove));
