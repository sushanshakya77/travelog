import * as mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  phoneNumber: String,
  email: String,
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  coverPicture: {
    data: Buffer,
    contentType: String,
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  currentCity: String,
  description: String,
  password: { type: String, required: true },
});

usersSchema.set('timestamps', {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

const User = mongoose.model('User', usersSchema);

export default User;
