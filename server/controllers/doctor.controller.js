const Doctor = require('../models/doctor.model');

async function list() {
  const result = await Doctor.find();
  return result;
}

async function insert(data) {
  const result = await Doctor(data).save();
  return result;
}

async function update(id, data) {
  if (!id) throw new Error('Missing parameter "id".');

  if (data.id) delete data.id;
  if (data._id) delete data._id;

  const filter = {
    _id: id
  };

  const result = await Doctor.findOneAndUpdate(filter, data);
  return result;
}

async function remove(id) {
  if (!id) throw new Error('Missing parameter "id".');

  const filter = {
    _id: id
  };

  const result = await Doctor.findOneAndDelete(filter);
  return result;
}

module.exports = {
  list,
  insert,
  update,
  remove
};
