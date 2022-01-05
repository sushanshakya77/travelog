import * as mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: String,
  userName: { type: String, required: true },
  phoneNumber: String,
  email: String,
  password: { type: String, required: true },
});

const User = mongoose.model('User', usersSchema);

export default User;
