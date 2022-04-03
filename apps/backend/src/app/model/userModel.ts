import * as mongoose from 'mongoose';

enum Roles {
  'ADMIN' = 'ADMIN',
  'USER' = 'USER',
}

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  phoneNumber: String,
  email: String,
  role: { type: String, enum: [Roles.ADMIN, Roles.USER], default: Roles.USER },
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
