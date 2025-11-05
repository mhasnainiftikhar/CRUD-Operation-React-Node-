const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
